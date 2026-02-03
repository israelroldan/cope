/**
 * Content Generation Tool
 *
 * Generates email content variants based on goal, segment, and tone.
 * Produces both NL and Flanders (BE) localizations.
 */

import type { ContentVariant, GeneratedContent } from '../intercom/types.js';

export interface GenerateContentInput {
  goal: string;
  segment: string;
  tone: string;
  locales: ('nl' | 'be')[];
}

// Tool definition for Claude
export const generateContentTool = {
  name: 'generate_content',
  description: `Generate email content variants for Gynzy marketing communications.
Creates subject lines and body content tailored to the specified goal, segment, and tone.
Produces variants for each requested locale (NL = Netherlands, BE = Flanders/Belgium).
Output follows Gynzy brand voice guidelines.`,
  input_schema: {
    type: 'object' as const,
    properties: {
      goal: {
        type: 'string',
        description: 'The goal of the email (e.g., "re-engage inactive teachers", "promote new feature")',
      },
      segment: {
        type: 'string',
        description: 'Target audience segment (e.g., "inactive-30d", "power-users", "onderbouw-teachers")',
      },
      tone: {
        type: 'string',
        description: 'Desired tone (e.g., "warm and encouraging", "professional", "playful")',
      },
      locales: {
        type: 'array',
        items: { type: 'string', enum: ['nl', 'be'] },
        description: 'Locales to generate content for',
      },
    },
    required: ['goal', 'segment', 'tone', 'locales'],
  },
};

/**
 * Process the generate_content tool call
 *
 * Note: In the actual implementation, this would be handled by Claude's response.
 * This function is for when we need to process tool results or do local generation.
 */
export function processGeneratedContent(
  input: GenerateContentInput,
  aiResponse: string
): GeneratedContent {
  // Parse AI response into structured format
  // The AI should return JSON with variants array

  try {
    const parsed = JSON.parse(aiResponse);
    return {
      goal: input.goal,
      segment: input.segment,
      tone: input.tone,
      variants: parsed.variants as ContentVariant[],
      reasoning: parsed.reasoning || '',
    };
  } catch {
    // If AI didn't return valid JSON, wrap the text response
    return {
      goal: input.goal,
      segment: input.segment,
      tone: input.tone,
      variants: [],
      reasoning: aiResponse,
    };
  }
}

/**
 * Example few-shot content for the prompt
 */
export const contentExamples = {
  reEngagement: {
    nl: {
      subject: 'We missen je in de klas!',
      body: `Hoi {{first_name}},

Het is even geleden dat we je in Gynzy hebben gezien. We snappen het - het onderwijs is druk en er komt veel op je af.

Maar wist je dat er intussen een paar handige nieuwe tools zijn toegevoegd? Zoals de verbeterde Rekenmuur en nieuwe samenwerkingsopties.

Kom je weer langs? We helpen je graag weer op weg.

Groetjes,
Het Gynzy team`,
    },
    be: {
      subject: 'We missen je in de klas!',
      body: `Dag {{first_name}},

Het is even geleden dat we je in Gynzy hebben gezien. We begrijpen het - het onderwijs is druk en er komt veel op je af.

Maar wist je dat er intussen een paar handige nieuwe tools zijn toegevoegd? Zoals de verbeterde Rekenmuur en nieuwe samenwerkingsmogelijkheden.

Kom je weer eens langs? We helpen je graag weer op weg.

Vriendelijke groeten,
Het Gynzy team`,
    },
  },
};
