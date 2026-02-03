/**
 * Push to Intercom Tool
 *
 * Pushes generated content to Intercom as email templates.
 * Uses the IntercomAdapter to handle the internal API calls.
 */

import type { IntercomAdapter } from '../intercom/adapter.js';
import type { ContentVariant, TemplateResult } from '../intercom/types.js';

export interface PushToIntercomInput {
  templateName: string;
  variants: ContentVariant[];
  dryRun?: boolean;
}

export interface PushResult {
  success: boolean;
  templates: TemplateResult[];
  errors: string[];
}

// Tool definition for Claude
export const pushToIntercomTool = {
  name: 'push_to_intercom',
  description: `Push generated content to Intercom as email templates.
Creates one template per locale variant.
Templates are created in draft status for human review.
Set dryRun to true to preview without actually creating templates.`,
  input_schema: {
    type: 'object' as const,
    properties: {
      templateName: {
        type: 'string',
        description: 'Base name for the templates (locale suffix will be added)',
      },
      variants: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            locale: { type: 'string', enum: ['nl', 'be'] },
            subject: { type: 'string' },
            body: { type: 'string' },
            preheader: { type: 'string' },
          },
          required: ['locale', 'subject', 'body'],
        },
        description: 'Content variants to push (one per locale)',
      },
      dryRun: {
        type: 'boolean',
        description: 'If true, preview only without creating templates',
      },
    },
    required: ['templateName', 'variants'],
  },
};

/**
 * Execute the push to Intercom
 */
export async function executePushToIntercom(
  adapter: IntercomAdapter,
  input: PushToIntercomInput
): Promise<PushResult> {
  const results: TemplateResult[] = [];
  const errors: string[] = [];

  if (input.dryRun) {
    console.log('\n[DRY RUN] Would create the following templates:\n');
    for (const variant of input.variants) {
      console.log(`Template: ${input.templateName} - ${variant.locale.toUpperCase()}`);
      console.log(`Subject: ${variant.subject}`);
      console.log(`Body preview: ${variant.body.substring(0, 200)}...`);
      console.log('---');
    }
    return { success: true, templates: [], errors: [] };
  }

  for (const variant of input.variants) {
    try {
      const templateName = `${input.templateName} - ${variant.locale.toUpperCase()}`;

      const result = await adapter.createEmailTemplate({
        name: templateName,
        subject: variant.subject,
        body: variant.body,
        locale: variant.locale,
      });

      results.push(result);
      console.log(`Created template: ${templateName} (${result.id})`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      errors.push(`Failed to create ${variant.locale} variant: ${errorMsg}`);
    }
  }

  return {
    success: errors.length === 0,
    templates: results,
    errors,
  };
}
