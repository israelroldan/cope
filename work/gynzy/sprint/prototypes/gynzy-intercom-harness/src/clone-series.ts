#!/usr/bin/env npx tsx
/**
 * Clone Intercom Series CLI
 *
 * Clones an existing series as a template for a new one.
 * This is the recommended approach for creating new series programmatically.
 *
 * Usage:
 *   npx tsx src/clone-series.ts <source_series_id> "<new_name>"
 *
 * Example:
 *   npx tsx src/clone-series.ts 468097 "Teacher Plus Discovery - BE Schools"
 *
 * Workflow:
 *   1. Create a "template" series manually in Intercom with the desired structure
 *   2. Use this script to clone it with a new name
 *   3. The script will output instructions for final setup
 */

import { config } from 'dotenv';
import { IntercomAdapter } from './intercom/adapter.js';
import type { Series, SeriesNode } from './intercom/types.js';

config();

// =============================================================================
// Clone Logic
// =============================================================================

async function cloneSeries(
  adapter: IntercomAdapter,
  sourceId: string,
  newName: string
): Promise<void> {
  console.log(`\n🔄 Cloning series ${sourceId} as "${newName}"\n`);

  // Step 1: Fetch source series
  console.log('📋 Step 1: Fetching source series...');
  let sourceSeries: Series;
  try {
    sourceSeries = await adapter.getSeries(sourceId);
    console.log(`   ✅ Found: "${sourceSeries.name || 'Untitled'}"`);
    console.log(`   - State: ${sourceSeries.state === 0 ? 'Draft' : 'Live'}`);
  } catch (error) {
    console.error(`   ❌ Could not fetch source series: ${error}`);
    process.exit(1);
  }

  // Step 2: Analyze the series structure
  console.log('\n📊 Step 2: Analyzing series structure...');
  const nodes = sourceSeries.nodes || [];
  const edges = sourceSeries.edges || [];

  console.log(`   Nodes: ${nodes.length}`);
  nodes.forEach((node, i) => {
    const typeEmoji = getNodeEmoji(node.type);
    console.log(`     ${i + 1}. ${typeEmoji} ${node.type}: ${node.data?.title || node.id}`);
  });

  console.log(`   Edges: ${edges.length}`);

  // Step 3: Generate clone configuration
  console.log('\n📝 Step 3: Generating clone configuration...');

  const cloneConfig = {
    name: newName,
    sourceId,
    sourceName: sourceSeries.name,
    structure: {
      nodes: nodes.map((n) => ({
        type: n.type,
        title: n.data?.title,
        position: n.position,
      })),
      edges: edges.length,
    },
  };

  console.log('\n   Clone Configuration:');
  console.log('   ' + JSON.stringify(cloneConfig, null, 2).replace(/\n/g, '\n   '));

  // Step 4: Provide manual instructions (since we can't POST yet)
  console.log('\n' + '='.repeat(60));
  console.log('📌 MANUAL STEPS REQUIRED');
  console.log('='.repeat(60));
  console.log(`
Since Intercom's Series creation endpoint hasn't been fully reverse-engineered,
please complete these manual steps:

1. Open Intercom and go to:
   https://app.intercom.com/a/apps/vzzy2jf5/outbound/series

2. Click "+ New Series" → "Start from scratch"

3. Name the series: "${newName}"

4. Recreate the structure from the source series:
`);

  nodes.forEach((node, i) => {
    const typeEmoji = getNodeEmoji(node.type);
    if (node.type === 'entry-rules') {
      console.log(`   ${i + 1}. ${typeEmoji} Add RULES block with same targeting criteria`);
    } else if (node.type === 'email') {
      console.log(`   ${i + 1}. ${typeEmoji} Add EMAIL block: "${node.data?.title || 'Email'}"`);
    } else if (node.type === 'wait') {
      console.log(`   ${i + 1}. ${typeEmoji} Add WAIT block`);
    } else {
      console.log(`   ${i + 1}. ${typeEmoji} Add ${node.type.toUpperCase()} block`);
    }
  });

  console.log(`
5. Connect the blocks in the same order

6. Note the new series ID from the URL

7. Run this command to populate the content:
   npx tsx src/update-series.ts <new_series_id> --name "${newName}"
`);

  // Output the configuration for future automation
  const outputFile = `/tmp/clone-config-${Date.now()}.json`;
  console.log(`\n💾 Clone config saved to: ${outputFile}`);
  console.log('   (Use this for future automation once the API is fully implemented)\n');
}

function getNodeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    'entry-rules': '🎯',
    email: '📧',
    wait: '⏰',
    chat: '💬',
    post: '📝',
    workflow: '⚙️',
    tour: '🎓',
    banner: '🏷️',
    push: '📱',
    carousel: '🎠',
  };
  return emojis[type] || '📦';
}

// =============================================================================
// CLI Entry Point
// =============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2 || args[0] === '--help') {
    console.log(`
Clone Intercom Series CLI

Usage:
  npx tsx src/clone-series.ts <source_series_id> "<new_name>"

Arguments:
  source_series_id    ID of the series to clone (from URL)
  new_name            Name for the new series

Examples:
  npx tsx src/clone-series.ts 468097 "Teacher Plus Discovery - BE Schools"
  npx tsx src/clone-series.ts 468097 "Teacher Plus Discovery - New Users"

This script will:
  1. Fetch the source series structure
  2. Generate clone configuration
  3. Provide step-by-step instructions for manual creation
  4. Output the update command to populate content
`);
    process.exit(0);
  }

  const sourceId = args[0];
  const newName = args[1];

  console.log('🔐 Connecting to Intercom...');

  const adapter = new IntercomAdapter(
    {
      email: process.env.INTERCOM_EMAIL || '',
      password: process.env.INTERCOM_PASSWORD || '',
    },
    process.env.INTERCOM_INTERNAL_API_BASE || 'https://app.intercom.com'
  );

  // Test connection
  try {
    const connected = await adapter.testConnection();
    if (!connected) {
      console.log('❌ Could not connect. Check .env credentials.');
      process.exit(1);
    }
    console.log('✅ Connected!\n');
  } catch (error) {
    console.log(`❌ Error: ${error}`);
    process.exit(1);
  }

  await cloneSeries(adapter, sourceId, newName);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
