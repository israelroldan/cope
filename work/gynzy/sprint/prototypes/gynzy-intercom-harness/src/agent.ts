/**
 * Gynzy Content Agent
 *
 * Claude-powered agent for generating and pushing marketing content.
 * Uses the Anthropic SDK with tool use for content generation.
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { IntercomAdapter } from './intercom/adapter.js';
import { generateContentTool, contentExamples } from './tools/generate-content.js';
import { pushToIntercomTool, executePushToIntercom } from './tools/push-to-intercom.js';
import type { ContentVariant } from './intercom/types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface AgentConfig {
  anthropicApiKey: string;
  intercomEmail: string;
  intercomPassword: string;
  intercomBaseUrl?: string;
}

export interface ContentContext {
  user?: {
    name?: string;
    segment?: string;
    teacherDna?: {
      digivaardigheid?: number;
      structuurBehoefte?: 'laag' | 'midden' | 'hoog';
      onderbouwBovenbouw?: 'onderbouw' | 'bovenbouw' | 'mixed';
      featuresUsed?: string[];
      lastActive?: string;
    };
  };
  flow?: {
    name?: string;
    stage?: 'onboarding' | 'activation' | 'penetration' | 'expansion';
    previousMessages?: string[];
    goal?: string;
  };
  goals?: {
    primary?: string;
    kpis?: string[];
    constraints?: string[];
  };
  brandVoice?: {
    tone?: string;
    avoidWords?: string[];
    includeElements?: string[];
  };
  additionalContext?: string;
}

export interface CreateContentRequest {
  goal: string;
  segment: string;
  tone: string;
  locales: ('nl' | 'be')[];
  context?: ContentContext;
}

export interface CreateContentResult {
  variants: ContentVariant[];
  reasoning: string;
  pushed: boolean;
  templateIds?: string[];
}

export class GynzyContentAgent {
  private client: Anthropic;
  private adapter: IntercomAdapter;
  private systemPrompt: string;

  constructor(config: AgentConfig) {
    this.client = new Anthropic({ apiKey: config.anthropicApiKey });
    this.adapter = new IntercomAdapter(
      { email: config.intercomEmail, password: config.intercomPassword },
      config.intercomBaseUrl
    );

    // Load system prompt
    try {
      this.systemPrompt = readFileSync(
        join(__dirname, '../prompts/system.md'),
        'utf-8'
      );
    } catch {
      // Fallback if file not found (e.g., in tests)
      this.systemPrompt = 'You are a helpful assistant for generating marketing email content.';
    }
  }

  /**
   * Generate content for a marketing goal
   */
  async generateContent(request: CreateContentRequest): Promise<ContentVariant[]> {
    const userMessage = this.buildContentPrompt(request);

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: this.systemPrompt,
      tools: [generateContentTool, pushToIntercomTool],
      messages: [{ role: 'user', content: userMessage }],
    });

    // Extract content from response
    const variants = this.parseContentResponse(response, request.locales);
    return variants;
  }

  /**
   * Push content to Intercom
   */
  async pushContent(
    templateName: string,
    variants: ContentVariant[],
    dryRun = false
  ): Promise<{ success: boolean; templateIds: string[]; errors: string[] }> {
    const result = await executePushToIntercom(this.adapter, {
      templateName,
      variants,
      dryRun,
    });

    return {
      success: result.success,
      templateIds: result.templates.map((t) => t.id),
      errors: result.errors,
    };
  }

  /**
   * Full flow: generate and optionally push
   */
  async createContent(
    request: CreateContentRequest,
    templateName: string,
    push = false,
    dryRun = false
  ): Promise<CreateContentResult> {
    // Generate content
    const variants = await this.generateContent(request);

    // Optionally push to Intercom
    if (push) {
      const pushResult = await this.pushContent(templateName, variants, dryRun);
      return {
        variants,
        reasoning: '',
        pushed: pushResult.success,
        templateIds: pushResult.templateIds,
      };
    }

    return {
      variants,
      reasoning: '',
      pushed: false,
    };
  }

  /**
   * Build the content generation prompt
   */
  private buildContentPrompt(request: CreateContentRequest): string {
    let prompt = `Generate email content for Gynzy with the following requirements:

**Goal:** ${request.goal}
**Target Segment:** ${request.segment}
**Tone:** ${request.tone}
**Locales:** ${request.locales.join(', ')}`;

    // Add context if provided
    if (request.context) {
      prompt += '\n\n---\n**CONTEXT (use this to personalize the content):**\n';

      if (request.context.user?.teacherDna) {
        const dna = request.context.user.teacherDna;
        prompt += '\n**Teacher Profile (Teacher DNA):**\n';
        if (dna.digivaardigheid !== undefined) {
          prompt += `- Digital proficiency: ${dna.digivaardigheid}/10 ${dna.digivaardigheid < 4 ? '(needs simpler instructions)' : dna.digivaardigheid > 7 ? '(can handle advanced features)' : '(moderate)'}\n`;
        }
        if (dna.structuurBehoefte) {
          prompt += `- Structure need: ${dna.structuurBehoefte} ${dna.structuurBehoefte === 'hoog' ? '(appreciates step-by-step guidance)' : ''}\n`;
        }
        if (dna.onderbouwBovenbouw) {
          prompt += `- Teaches: ${dna.onderbouwBovenbouw} ${dna.onderbouwBovenbouw === 'onderbouw' ? '(younger children, more playful tone OK)' : '(older children)'}\n`;
        }
        if (dna.featuresUsed?.length) {
          prompt += `- Features they use: ${dna.featuresUsed.join(', ')}\n`;
        }
        if (dna.lastActive) {
          prompt += `- Last active: ${dna.lastActive}\n`;
        }
      }

      if (request.context.flow) {
        prompt += '\n**Flow Context:**\n';
        if (request.context.flow.name) prompt += `- Flow: ${request.context.flow.name}\n`;
        if (request.context.flow.stage) prompt += `- Lifecycle stage: ${request.context.flow.stage}\n`;
        if (request.context.flow.goal) prompt += `- Flow goal: ${request.context.flow.goal}\n`;
        if (request.context.flow.previousMessages?.length) {
          prompt += `- Previous messages sent: ${request.context.flow.previousMessages.length} (avoid repeating similar content)\n`;
        }
      }

      if (request.context.goals) {
        prompt += '\n**Campaign Goals:**\n';
        if (request.context.goals.primary) prompt += `- Primary: ${request.context.goals.primary}\n`;
        if (request.context.goals.kpis?.length) prompt += `- KPIs: ${request.context.goals.kpis.join(', ')}\n`;
        if (request.context.goals.constraints?.length) prompt += `- Constraints: ${request.context.goals.constraints.join(', ')}\n`;
      }

      if (request.context.brandVoice) {
        prompt += '\n**Brand Voice Overrides:**\n';
        if (request.context.brandVoice.avoidWords?.length) {
          prompt += `- Avoid these words: ${request.context.brandVoice.avoidWords.join(', ')}\n`;
        }
        if (request.context.brandVoice.includeElements?.length) {
          prompt += `- Include: ${request.context.brandVoice.includeElements.join(', ')}\n`;
        }
      }

      if (request.context.additionalContext) {
        prompt += `\n**Additional Context:**\n${request.context.additionalContext}\n`;
      }
    }

    prompt += `

---

Please generate email variants for each locale. Include:
- Subject line (compelling, max 60 chars)
- Preheader text (optional teaser)
- Email body (use {{first_name}} for personalization)

Here's an example of good Gynzy email content for reference:

**NL Example:**
Subject: ${contentExamples.reEngagement.nl.subject}
Body:
${contentExamples.reEngagement.nl.body}

**BE Example:**
Subject: ${contentExamples.reEngagement.be.subject}
Body:
${contentExamples.reEngagement.be.body}

Now generate content for the specified goal. Return your response as JSON with the structure:
{
  "variants": [
    { "locale": "nl", "subject": "...", "body": "...", "preheader": "..." },
    { "locale": "be", "subject": "...", "body": "...", "preheader": "..." }
  ],
  "reasoning": "Brief explanation of your choices"
}`;

    return prompt;
  }

  /**
   * Parse Claude's response to extract content variants
   */
  private parseContentResponse(
    response: Anthropic.Message,
    requestedLocales: ('nl' | 'be')[]
  ): ContentVariant[] {
    // Look for text content in the response
    for (const block of response.content) {
      if (block.type === 'text') {
        try {
          // Try to find JSON in the response
          const jsonMatch = block.text.match(/\{[\s\S]*"variants"[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return parsed.variants as ContentVariant[];
          }
        } catch {
          // If JSON parsing fails, continue to next block
        }
      }
    }

    // Fallback: return empty variants
    console.warn('Could not parse content variants from response');
    return requestedLocales.map((locale) => ({
      locale,
      subject: '',
      body: '',
    }));
  }

  /**
   * Test the Intercom connection
   */
  async testConnection(): Promise<boolean> {
    return this.adapter.testConnection();
  }
}
