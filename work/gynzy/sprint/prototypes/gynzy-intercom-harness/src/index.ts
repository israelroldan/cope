#!/usr/bin/env node
/**
 * Gynzy Intercom Content Harness - CLI
 *
 * AI-powered content generation for Intercom via internal API.
 *
 * Usage:
 *   gynzy-content create --goal "re-engage inactive" --segment "inactive-30d" --tone "warm"
 *   gynzy-content create --interactive
 *   gynzy-content test-connection
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { config } from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { GynzyContentAgent } from './agent.js';
import type { ContentVariant } from './intercom/types.js';

/**
 * Context file structure - provides background for content generation
 */
interface ContentContext {
  // User/segment information
  user?: {
    name?: string;
    segment?: string;
    teacherDna?: {
      digivaardigheid?: number;  // Digital proficiency score
      structuurBehoefte?: 'laag' | 'midden' | 'hoog';  // Structure need
      onderbouwBovenbouw?: 'onderbouw' | 'bovenbouw' | 'mixed';
      featuresUsed?: string[];
      lastActive?: string;
    };
  };
  // Flow context
  flow?: {
    name?: string;
    stage?: 'onboarding' | 'activation' | 'penetration' | 'expansion';
    previousMessages?: string[];
    goal?: string;
  };
  // Company/campaign goals
  goals?: {
    primary?: string;
    kpis?: string[];
    constraints?: string[];
  };
  // Brand voice overrides
  brandVoice?: {
    tone?: string;
    avoidWords?: string[];
    includeElements?: string[];
  };
  // Any additional context as free text
  additionalContext?: string;
}

// Load environment variables
config();

const program = new Command();

program
  .name('gynzy-content')
  .description('AI-powered content generation for Intercom')
  .version('0.1.0');

// Create content command
program
  .command('create')
  .description('Generate email content and optionally push to Intercom')
  .option('-g, --goal <goal>', 'Goal of the email (e.g., "re-engage inactive teachers")')
  .option('-s, --segment <segment>', 'Target segment (e.g., "inactive-30d")')
  .option('-t, --tone <tone>', 'Tone (e.g., "warm", "professional")', 'warm and encouraging')
  .option('-l, --locales <locales>', 'Comma-separated locales (nl,be)', 'nl,be')
  .option('-c, --context <path>', 'Path to context file (JSON/YAML/MD) with user, flow, and goal info')
  .option('-n, --name <name>', 'Template name for Intercom')
  .option('-p, --push', 'Push to Intercom after generation')
  .option('-d, --dry-run', 'Preview without actually pushing')
  .option('-i, --interactive', 'Interactive mode with prompts')
  .action(async (options) => {
    // Check required env vars
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error(chalk.red('Error: ANTHROPIC_API_KEY environment variable required'));
      process.exit(1);
    }

    let goal = options.goal;
    let segment = options.segment;
    let tone = options.tone;
    let locales = options.locales?.split(',') as ('nl' | 'be')[];
    let templateName = options.name;
    let context: ContentContext | undefined;

    // Load context file if provided
    if (options.context) {
      context = loadContextFile(options.context);
      if (context) {
        console.log(chalk.dim(`Loaded context from: ${options.context}`));
        // Use context to set defaults
        if (context.goals?.primary && !goal) goal = context.goals.primary;
        if (context.user?.segment && !segment) segment = context.user.segment;
        if (context.brandVoice?.tone && tone === 'warm and encouraging') tone = context.brandVoice.tone;
      }
    }

    // Interactive mode
    if (options.interactive || (!goal && !segment)) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'goal',
          message: 'What is the goal of this email?',
          default: goal || 're-engage teachers who have been inactive for 30 days',
        },
        {
          type: 'input',
          name: 'segment',
          message: 'Which segment is this for?',
          default: segment || 'inactive-30d',
        },
        {
          type: 'list',
          name: 'tone',
          message: 'What tone should the email have?',
          choices: [
            'warm and encouraging',
            'professional',
            'playful',
            'urgent',
            'celebratory',
          ],
          default: tone,
        },
        {
          type: 'checkbox',
          name: 'locales',
          message: 'Which locales?',
          choices: [
            { name: 'Netherlands (NL)', value: 'nl', checked: true },
            { name: 'Flanders/Belgium (BE)', value: 'be', checked: true },
          ],
        },
        {
          type: 'input',
          name: 'templateName',
          message: 'Template name (for Intercom):',
          default: templateName || 'Re-engagement - Inactive 30d',
        },
      ]);

      goal = answers.goal;
      segment = answers.segment;
      tone = answers.tone;
      locales = answers.locales;
      templateName = answers.templateName;
    }

    if (!goal || !segment) {
      console.error(chalk.red('Error: --goal and --segment are required (or use --interactive)'));
      process.exit(1);
    }

    // Initialize agent
    const agent = new GynzyContentAgent({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
      intercomEmail: process.env.INTERCOM_EMAIL || '',
      intercomPassword: process.env.INTERCOM_PASSWORD || '',
      intercomBaseUrl: process.env.INTERCOM_INTERNAL_API_BASE,
    });

    // Generate content
    const spinner = ora('Generating content...').start();

    try {
      const variants = await agent.generateContent({
        goal,
        segment,
        tone,
        locales,
        context,
      });

      spinner.succeed('Content generated!');

      // Display variants
      console.log('\n' + chalk.bold('Generated Content:'));
      console.log(chalk.dim('─'.repeat(60)));

      for (const variant of variants) {
        displayVariant(variant);
      }

      // Ask about pushing to Intercom
      if (options.push || options.dryRun) {
        await handlePush(agent, templateName || `${goal} - ${segment}`, variants, options.dryRun);
      } else {
        const { shouldPush } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'shouldPush',
            message: 'Push to Intercom as draft templates?',
            default: false,
          },
        ]);

        if (shouldPush) {
          const { dryRun } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'dryRun',
              message: 'Dry run first (preview only)?',
              default: true,
            },
          ]);

          await handlePush(agent, templateName || `${goal} - ${segment}`, variants, dryRun);
        }
      }
    } catch (error) {
      spinner.fail('Failed to generate content');
      console.error(chalk.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  });

// Test connection command
program
  .command('test-connection')
  .description('Test the Intercom API connection')
  .action(async () => {
    const spinner = ora('Testing Intercom connection...').start();

    const agent = new GynzyContentAgent({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY || 'not-needed-for-test',
      intercomEmail: process.env.INTERCOM_EMAIL || '',
      intercomPassword: process.env.INTERCOM_PASSWORD || '',
      intercomBaseUrl: process.env.INTERCOM_INTERNAL_API_BASE,
    });

    const success = await agent.testConnection();

    if (success) {
      spinner.succeed('Connected to Intercom successfully!');
    } else {
      spinner.fail('Could not connect to Intercom');
      process.exit(1);
    }
  });

// Helper functions

/**
 * Load context from a file (JSON, YAML-like, or Markdown with frontmatter)
 */
function loadContextFile(filePath: string): ContentContext | undefined {
  if (!existsSync(filePath)) {
    console.error(chalk.red(`Context file not found: ${filePath}`));
    process.exit(1);
  }

  try {
    const content = readFileSync(filePath, 'utf-8');

    // Try JSON first
    if (filePath.endsWith('.json')) {
      return JSON.parse(content) as ContentContext;
    }

    // Try Markdown with JSON code block
    if (filePath.endsWith('.md')) {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]) as ContentContext;
      }
      // Or treat the whole file as additional context
      return { additionalContext: content };
    }

    // Default: try JSON parsing
    return JSON.parse(content) as ContentContext;
  } catch (error) {
    console.error(chalk.red(`Failed to parse context file: ${error instanceof Error ? error.message : String(error)}`));
    process.exit(1);
  }
}

/**
 * Format context for display
 */
function displayContext(context: ContentContext): void {
  console.log(chalk.bold('\nContext:'));

  if (context.user?.teacherDna) {
    const dna = context.user.teacherDna;
    console.log(chalk.dim('  Teacher DNA:'));
    if (dna.digivaardigheid !== undefined) console.log(`    Digivaardigheid: ${dna.digivaardigheid}/10`);
    if (dna.structuurBehoefte) console.log(`    Structuurbehoefte: ${dna.structuurBehoefte}`);
    if (dna.onderbouwBovenbouw) console.log(`    Groep: ${dna.onderbouwBovenbouw}`);
  }

  if (context.flow) {
    console.log(chalk.dim('  Flow:'));
    if (context.flow.name) console.log(`    Name: ${context.flow.name}`);
    if (context.flow.stage) console.log(`    Stage: ${context.flow.stage}`);
  }

  if (context.goals?.primary) {
    console.log(chalk.dim(`  Primary goal: ${context.goals.primary}`));
  }
}

function displayVariant(variant: ContentVariant): void {
  const localeLabel = variant.locale === 'nl' ? 'Netherlands' : 'Flanders';
  console.log(chalk.cyan(`\n[${variant.locale.toUpperCase()}] ${localeLabel}`));
  console.log(chalk.yellow('Subject:'), variant.subject);
  if (variant.preheader) {
    console.log(chalk.yellow('Preheader:'), variant.preheader);
  }
  console.log(chalk.yellow('Body:'));
  console.log(variant.body);
  console.log(chalk.dim('─'.repeat(60)));
}

async function handlePush(
  agent: GynzyContentAgent,
  templateName: string,
  variants: ContentVariant[],
  dryRun: boolean
): Promise<void> {
  const spinner = ora(dryRun ? 'Previewing push...' : 'Pushing to Intercom...').start();

  try {
    const result = await agent.pushContent(templateName, variants, dryRun);

    if (result.success) {
      if (dryRun) {
        spinner.succeed('Dry run complete (no templates created)');
      } else {
        spinner.succeed(`Created ${result.templateIds.length} template(s)`);
        console.log(chalk.green('Template IDs:'), result.templateIds.join(', '));
      }
    } else {
      spinner.fail('Failed to push some templates');
      for (const error of result.errors) {
        console.error(chalk.red(`  - ${error}`));
      }
    }
  } catch (error) {
    spinner.fail('Push failed');
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
  }
}

program.parse();
