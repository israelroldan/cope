/**
 * Test script for Intercom API
 *
 * Run with: npx tsx src/test-api.ts
 */

import { config } from 'dotenv';
import { IntercomAdapter } from './intercom/adapter.js';

config();

async function main() {
  console.log('🔐 Testing Intercom API Connection...\n');

  const adapter = new IntercomAdapter(
    {
      email: process.env.INTERCOM_EMAIL || '',
      password: process.env.INTERCOM_PASSWORD || '',
    },
    process.env.INTERCOM_INTERNAL_API_BASE || 'https://app.intercom.com'
  );

  // Test 1: Connection test (ping)
  console.log('1️⃣ Testing connection (ping)...');
  try {
    const connected = await adapter.testConnection();
    console.log(`   Result: ${connected ? '✅ Connected!' : '❌ Failed'}\n`);
  } catch (error) {
    console.log(`   Result: ❌ Error - ${error}\n`);
  }

  // Test 2: Get existing email content
  console.log('2️⃣ Fetching email content (ID: 79725543)...');
  try {
    const content = await adapter.getLocalizedEmailContent('79725543');
    console.log(`   Result: ✅ Got content`);
    console.log(`   - Locale: ${content.locale}`);
    console.log(`   - Subject: ${content.subject || '(in blocks)'}`);
    console.log(`   - Has blocks: ${content.blocks ? 'yes' : 'no'}\n`);
  } catch (error) {
    console.log(`   Result: ❌ Error - ${error}\n`);
  }

  // Test 3: Get ruleset
  console.log('3️⃣ Fetching ruleset (ID: 56890016)...');
  try {
    const ruleset = await adapter.getRuleset('56890016');
    console.log(`   Result: ✅ Got ruleset`);
    console.log(`   - State: ${ruleset.state === 0 ? 'Draft' : 'Live'}`);
    console.log(`   - Links: ${ruleset.rulesetLinks?.length || 0}\n`);
  } catch (error) {
    console.log(`   Result: ❌ Error - ${error}\n`);
  }

  // Test 4: List templates
  console.log('4️⃣ Listing templates...');
  try {
    const templates = await adapter.listTemplates();
    console.log(`   Result: ✅ Found ${templates.length} templates\n`);
  } catch (error) {
    console.log(`   Result: ❌ Error - ${error}\n`);
  }

  console.log('✨ Tests complete!');
}

main().catch(console.error);
