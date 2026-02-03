#!/usr/bin/env npx tsx
/**
 * Create Intercom Series CLI
 *
 * Creates a complete "Teacher Plus Discovery" series programmatically using
 * reverse-engineered Intercom internal APIs.
 *
 * Usage:
 *   npx tsx src/create-series.ts "Series Name Here"
 *
 * Example:
 *   npx tsx src/create-series.ts "Teacher Plus Discovery - NL Penetrated"
 *   npx tsx src/create-series.ts "Teacher Plus Discovery - BE Schools" --market BE
 *
 * API Endpoints Used (discovered Jan 14, 2026):
 *   POST /ember/series/series - Create new series
 *   POST /ember/series/nodes - Add nodes (entry-rules, email, wait)
 *   PUT /ember/matching_system/rulesets/{id} - Configure entry rules
 *
 * Node object_type codes:
 *   8  = EMAIL
 *   51 = RULES (entry rules)
 *   52 = WAIT
 */

import { config } from 'dotenv';
import { IntercomAdapter, SERIES_NODE_TYPES } from './intercom/adapter.js';

config();

// =============================================================================
// Series Configuration
// =============================================================================

interface SeriesConfig {
  name: string;
  market?: 'NL' | 'BE';
  lastSeenDays?: number;
  waitDays?: number;
}

// Entry rules predicate for market users active in last N days
function buildPredicates(cfg: SeriesConfig) {
  const predicates = [];

  // Market filter (country)
  if (cfg.market) {
    predicates.push({
      attribute: 'geoip_data.country_name',
      comparison: 'eq',
      type: 'string',
      value: cfg.market,
    });
  }

  return {
    predicate_group: { predicates },
    role_predicate_group: {
      predicates: [
        {
          attribute: 'role',
          comparison: 'in',
          type: 'role',
          value: ['user_role'],
        },
      ],
    },
    client_predicate_group: { predicates: [] },
    default_predicate_group: { predicates: [] },
  };
}

// =============================================================================
// Main Series Creation Logic
// =============================================================================

async function createTeacherPlusSeries(
  adapter: IntercomAdapter,
  cfg: SeriesConfig
): Promise<string> {
  const appId = process.env.INTERCOM_APP_ID || 'vzzy2jf5';

  console.log(`\n🚀 Creating series: "${cfg.name}"\n`);

  // Step 1: Create the series
  console.log('📋 Step 1: Creating empty series...');
  const series = await adapter.createSeries(null);
  const seriesId = series.id;
  console.log(`   ✅ Created series ID: ${seriesId}`);

  // Step 2: Add Entry Rules node
  console.log('\n🎯 Step 2: Adding Entry Rules node...');
  const entryNode = await adapter.addSeriesNode(seriesId, SERIES_NODE_TYPES.RULES, {});
  console.log(`   ✅ Entry rules node ID: ${entryNode.id}`);
  const rulesetId = entryNode.ruleset_id;
  if (rulesetId) {
    console.log(`   📝 Ruleset ID: ${rulesetId}`);
  }

  // Step 3: Configure entry rules predicates
  if (rulesetId) {
    console.log('\n⚙️  Step 3: Configuring audience targeting...');
    const predicates = buildPredicates(cfg);

    const rulesetPayload = {
      id: rulesetId,
      match_behavior: 1,
      ...predicates,
      matching_timetable: null,
      recurring_schedule: {
        date_attribute: 'last_request_at',
        day_offset: -(cfg.lastSeenDays || 90),
        frequency: 0,
        month_offset: null,
        ruleset_id: parseInt(rulesetId, 10),
        schedule_type: 0,
      },
      scheduled_activation: null,
      scheduled_deactivation: null,
      goal: null,
      utm_settings: null,
      series_relation: {
        series_id: parseInt(seriesId, 10),
        series_title: null,
        node_id: parseInt(entryNode.id, 10),
      },
      match_spacing_period: -1,
      max_match_count: -1,
      segment_ids: [],
      environment_ids: [],
      tag_ids: [],
      app_id: appId,
    };

    await adapter.updateRulesetRaw(rulesetId, rulesetPayload);
    console.log(`   ✅ Targeting: ${cfg.market || 'All'} users, last seen ${cfg.lastSeenDays || 90} days`);
  }

  // Step 4: Add Email 1 node
  console.log('\n📧 Step 4: Adding Email 1 node...');
  const email1Node = await adapter.addSeriesNode(seriesId, SERIES_NODE_TYPES.EMAIL, {});
  console.log(`   ✅ Email 1 node ID: ${email1Node.id}`);

  // Step 5: Add Wait node
  console.log('\n⏰ Step 5: Adding Wait node...');
  const waitNode = await adapter.addSeriesNode(seriesId, SERIES_NODE_TYPES.WAIT, {});
  console.log(`   ✅ Wait node ID: ${waitNode.id}`);

  // Step 6: Add Email 2 node
  console.log('\n📧 Step 6: Adding Email 2 node...');
  const email2Node = await adapter.addSeriesNode(seriesId, SERIES_NODE_TYPES.EMAIL, {});
  console.log(`   ✅ Email 2 node ID: ${email2Node.id}`);

  // Summary
  const seriesUrl = `https://app.intercom.com/a/apps/${appId}/outbound/series/${seriesId}?mode=edit`;

  console.log('\n' + '='.repeat(60));
  console.log('✨ Series created successfully!');
  console.log('='.repeat(60));
  console.log(`
Series ID: ${seriesId}
Name: ${cfg.name}

Nodes created:
  🎯 Entry Rules: ${entryNode.id} (Ruleset: ${rulesetId || 'N/A'})
  📧 Email 1:     ${email1Node.id}
  ⏰ Wait:        ${waitNode.id}
  📧 Email 2:     ${email2Node.id}

Open in Intercom:
  ${seriesUrl}

Next steps (in the Intercom UI):
  1. Connect Entry Rules → Email 1 (drag from "WHEN MATCHED")
  2. Connect Email 1 → Wait (drag from "WHEN SENT")
  3. Configure Wait duration (${cfg.waitDays || 3} days)
  4. Connect Wait → Email 2 (drag from "WHEN PASSED")
  5. Configure email content for both emails
  6. Set series live when ready
`);

  return seriesId;
}

// =============================================================================
// CLI Entry Point
// =============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Create Intercom Series CLI

Usage:
  npx tsx src/create-series.ts "<Series Name>" [options]

Options:
  --market <NL|BE>     Market filter (country)
  --last-seen <days>   Last seen within N days (default: 90)
  --wait-days <days>   Wait period between emails (default: 3)

Examples:
  npx tsx src/create-series.ts "Teacher Plus Discovery - NL Penetrated"
  npx tsx src/create-series.ts "Teacher Plus - BE" --market BE
  npx tsx src/create-series.ts "Active Users" --last-seen 30 --wait-days 7
`);
    process.exit(0);
  }

  const seriesName = args[0];

  // Parse options
  const marketIdx = args.indexOf('--market');
  const lastSeenIdx = args.indexOf('--last-seen');
  const waitDaysIdx = args.indexOf('--wait-days');

  const seriesConfig: SeriesConfig = {
    name: seriesName,
    market: marketIdx > -1 ? (args[marketIdx + 1] as 'NL' | 'BE') : undefined,
    lastSeenDays: lastSeenIdx > -1 ? parseInt(args[lastSeenIdx + 1], 10) : 90,
    waitDays: waitDaysIdx > -1 ? parseInt(args[waitDaysIdx + 1], 10) : 3,
  };

  // Check env vars
  if (!process.env.INTERCOM_EMAIL || !process.env.INTERCOM_PASSWORD) {
    console.error('❌ Missing INTERCOM_EMAIL or INTERCOM_PASSWORD in .env');
    process.exit(1);
  }

  console.log('🔐 Connecting to Intercom...');

  const adapter = new IntercomAdapter(
    {
      email: process.env.INTERCOM_EMAIL,
      password: process.env.INTERCOM_PASSWORD,
    },
    process.env.INTERCOM_INTERNAL_API_BASE || 'https://app.intercom.com'
  );

  // Test connection
  try {
    const connected = await adapter.testConnection();
    if (!connected) {
      console.error('❌ Could not connect to Intercom. Check credentials in .env');
      process.exit(1);
    }
    console.log('✅ Connected!\n');
  } catch (error) {
    console.error(`❌ Connection error: ${error}`);
    process.exit(1);
  }

  // Create the series
  try {
    await createTeacherPlusSeries(adapter, seriesConfig);
  } catch (error) {
    console.error(`\n❌ Failed to create series: ${error}`);
    process.exit(1);
  }
}

main();
