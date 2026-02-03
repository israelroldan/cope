#!/usr/bin/env npx tsx
/**
 * Update Intercom Series CLI
 *
 * Updates an existing series with Teacher Plus content.
 * Use this after creating a series manually in the UI.
 *
 * Usage:
 *   npx tsx src/update-series.ts <series_id> [--name "New Name"]
 *
 * Example:
 *   npx tsx src/update-series.ts 468097 --name "Teacher Plus Discovery - NL"
 */

import { config } from 'dotenv';
import { IntercomAdapter } from './intercom/adapter.js';

config();

// =============================================================================
// Series Content Templates (Dutch)
// =============================================================================

const SERIES_CONTENT = {
  email1: {
    title: 'Email 1: Ontdek Teacher Plus',
    subject: 'Ken je Teacher Plus al? Ontdek de mogelijkheden!',
    body: `Hi {{first_name|fallback:"daar"}},

Wist je dat Teacher Plus je kan helpen om nog meer uit Gynzy te halen?
Met Teacher Plus krijg je toegang tot:

• Uitgebreide rapportages over de voortgang van je leerlingen
• Extra lesmateriaal en oefeningen
• Geavanceerde tools voor differentiatie

Benieuwd naar wat Teacher Plus voor jou kan betekenen? Klik hieronder om meer te ontdekken!

Met vriendelijke groet,
Het Gynzy Team`,
  },
  email2: {
    title: 'Email 2: Teacher Plus Voordelen',
    subject: 'Nog steeds benieuwd naar Teacher Plus?',
    body: `Hi {{first_name|fallback:"daar"}},

Een paar dagen geleden vertelden we je over Teacher Plus. We willen je graag nog een paar voordelen laten zien:

📊 Inzicht in leerlingvoortgang - Volg de ontwikkeling van elke leerling
📚 Rijke contentbibliotheek - Duizenden extra oefeningen en lessen
🎯 Gedifferentieerd leren - Pas het niveau aan per leerling

Wil je Teacher Plus uitproberen? Vraag een demo aan of neem contact met ons op!

Groetjes,
Het Gynzy Team`,
  },
  waitDays: 3,
};

// =============================================================================
// Main Logic
// =============================================================================

async function updateSeries(
  adapter: IntercomAdapter,
  seriesId: string,
  newName?: string
): Promise<void> {
  console.log(`\n🔄 Updating series: ${seriesId}\n`);

  // Step 1: Get current series data
  console.log('📋 Step 1: Fetching current series...');
  let series;
  try {
    series = await adapter.getSeries(seriesId);
    console.log(`   ✅ Found series: "${series.name || 'Untitled'}"`);
    console.log(`   - State: ${series.state === 0 ? 'Draft' : 'Live'}`);
    console.log(`   - Created: ${series.createdAt}`);

    if (series.nodes) {
      console.log(`   - Nodes: ${series.nodes.length}`);
      series.nodes.forEach((node, i) => {
        console.log(`     ${i + 1}. ${node.type}: ${node.data?.title || node.id}`);
      });
    }
  } catch (error) {
    console.log(`   ❌ Could not fetch series: ${error}`);
    process.exit(1);
  }

  // Step 2: Update series name if provided
  if (newName) {
    console.log(`\n📝 Step 2: Updating series name to "${newName}"...`);
    try {
      const updated = await adapter.updateSeries(seriesId, { name: newName });
      console.log(`   ✅ Name updated!`);
    } catch (error) {
      console.log(`   ⚠️  Could not update name: ${error}`);
    }
  }

  // Step 3: Find email nodes and update content
  console.log('\n📧 Step 3: Looking for email nodes to update...');

  if (!series.nodes || series.nodes.length === 0) {
    console.log('   ℹ️  No nodes found. The series appears to be empty.');
    console.log('   ℹ️  Add blocks in the Intercom UI first, then run this script again.');
    return;
  }

  const emailNodes = series.nodes.filter((n) => n.type === 'email');
  console.log(`   Found ${emailNodes.length} email node(s)`);

  for (let i = 0; i < emailNodes.length; i++) {
    const node = emailNodes[i];
    const content = i === 0 ? SERIES_CONTENT.email1 : SERIES_CONTENT.email2;

    console.log(`\n   📨 Email ${i + 1}: ${node.data?.title || node.id}`);

    if (node.data?.localizedEmailContentId) {
      console.log(`      Content ID: ${node.data.localizedEmailContentId}`);
      console.log(`      Updating with: "${content.subject}"`);

      try {
        await adapter.updateEmailContentSimple(
          node.data.localizedEmailContentId,
          content.subject,
          content.body
        );
        console.log(`      ✅ Email content updated!`);
      } catch (error) {
        console.log(`      ❌ Failed to update: ${error}`);
      }
    } else {
      console.log(`      ⚠️  No localizedEmailContentId found`);
      console.log(`      ℹ️  Click on the email in Intercom UI to initialize it`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✨ Series update complete!');
  console.log('='.repeat(60));
  console.log(`
Next steps:
  1. Open the series in Intercom:
     https://app.intercom.com/a/apps/vzzy2jf5/outbound/series/${seriesId}?mode=edit

  2. Review the content and make any final adjustments

  3. When ready, click "Set series live" to activate
`);
}

// =============================================================================
// CLI Entry Point
// =============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Update Intercom Series CLI

Usage:
  npx tsx src/update-series.ts <series_id> [options]

Options:
  --name <name>    Update the series name

Examples:
  npx tsx src/update-series.ts 468097
  npx tsx src/update-series.ts 468097 --name "Teacher Plus Discovery - NL"

To find the series ID:
  1. Open the series in Intercom
  2. Look at the URL: /outbound/series/<SERIES_ID>
`);
    process.exit(0);
  }

  const seriesId = args[0];
  const nameIdx = args.indexOf('--name');
  const newName = nameIdx > -1 ? args[nameIdx + 1] : undefined;

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
      console.log('❌ Could not connect to Intercom. Check your credentials in .env');
      process.exit(1);
    }
    console.log('✅ Connected!\n');
  } catch (error) {
    console.log(`❌ Connection error: ${error}`);
    process.exit(1);
  }

  await updateSeries(adapter, seriesId, newName);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
