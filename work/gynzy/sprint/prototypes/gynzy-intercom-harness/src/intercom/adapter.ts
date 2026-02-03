/**
 * Intercom Internal API Adapter
 *
 * Wraps the reverse-engineered Intercom internal API endpoints.
 * All actual API calls go through this adapter.
 *
 * Based on reverse engineering session: January 14, 2026
 *
 * Model Hierarchies:
 *   Single Email: Ruleset -> RulesetLink -> Email -> LocalizedEmailContent
 *   Series: Series -> SeriesNode[] -> (Email/Wait/etc.)
 *
 * Key Endpoints:
 *   /ember/emails/localized_email_contents/{id} - Email content (subject, body)
 *   /ember/emails/emails/{id} - Email settings
 *   /ember/matching_system/rulesets/{id} - Campaign/targeting rules
 *   /ember/series/series/{id} - Series (multi-step message flows)
 *
 * IMPORTANT: These endpoints are not officially supported.
 * Use contract tests to detect breaking changes.
 */

import { IntercomAuth } from './auth.js';
import type {
  AuthCredentials,
  AuthHeaders,
  EmailTemplate,
  TemplateResult,
  IntercomApiResponse,
  LocalizedEmailContent,
  IntercomEmail,
  Ruleset,
  EmailBlocks,
  EmailSectionBlock,
  EmailContentBlock,
  Series,
  SeriesResult,
} from './types.js';

// =============================================================================
// Confirmed API Endpoints (from reverse engineering)
// =============================================================================

const ENDPOINTS = {
  // Email content (subject line, body blocks)
  localizedEmailContent: '/ember/emails/localized_email_contents/:id',

  // Email settings (unsubscribe, styling)
  email: '/ember/emails/emails/:id',

  // Campaign/ruleset (targeting, scheduling)
  ruleset: '/ember/matching_system/rulesets/:id',

  // Series endpoints (discovered via network inspection Jan 14, 2026)
  series: '/ember/series/series/:id',
  seriesCreate: '/ember/series/series',        // POST - create new series
  seriesNodes: '/ember/series/nodes',          // POST - add nodes to series

  // Heartbeat (for connection testing)
  ping: '/ember/ping.json',

  // Templates list
  templates: '/ember/templates',
} as const;

// Series node object_type codes (discovered via network inspection Jan 14, 2026)
export const SERIES_NODE_TYPES = {
  // Messages (category 0)
  CHAT: 38,
  POST: 45,
  EMAIL: 8,
  WORKFLOW: 54,       // requires: bot_workflows
  TOUR: 0,            // requires: product_tours
  BANNER: 10,
  PUSH: 18,
  CAROUSEL: 42,
  SMS: 30,            // requires: sms
  SURVEY: 84,         // requires: surveys
  WHATSAPP: 115,      // requires: whatsapp_integration
  CHECKLIST: 109,     // requires: checklists

  // Audience (category 1)
  RULES: 51,          // Entry rules / audience targeting

  // Flow control (category 2)
  WAIT: 52,
  TAG: 53,
  SPLIT_TEST: 64,     // requires: advanced_ab
  WEBHOOK: 75,        // requires: outbound_webhooks
} as const;

export class IntercomAdapter {
  private auth: IntercomAuth;
  private baseUrl: string;

  constructor(credentials: AuthCredentials, baseUrl = 'https://app.intercom.com') {
    this.auth = new IntercomAuth(credentials, baseUrl);
    this.baseUrl = baseUrl;
  }

  // ===========================================================================
  // Email Content Operations
  // ===========================================================================

  /**
   * Get localized email content by ID
   * This is where the actual subject line and body are stored
   */
  async getLocalizedEmailContent(id: string): Promise<LocalizedEmailContent> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.localizedEmailContent.replace(':id', id)}?app_id=${appId}`;

    const response = await this.request<LocalizedEmailContent>(endpoint, 'GET', headers);

    if (!response.success || !response.data) {
      throw new Error(`Failed to get email content: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Update localized email content
   * Use this to change subject line and body
   */
  async updateLocalizedEmailContent(
    id: string,
    updates: Partial<Pick<LocalizedEmailContent, 'blocks' | 'subjectBlocks' | 'subject'>>
  ): Promise<LocalizedEmailContent> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.localizedEmailContent.replace(':id', id)}?app_id=${appId}`;

    // Intercom uses Ember Data JSON API format
    const payload = {
      'emails/localized-email-content': {
        id,
        ...updates,
      },
    };

    const response = await this.request<LocalizedEmailContent>(endpoint, 'PUT', headers, payload);

    if (!response.success || !response.data) {
      throw new Error(`Failed to update email content: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Update email content with plain text (converts to blocks format)
   * This is a convenience method for simpler use cases
   */
  async updateEmailContentSimple(
    id: string,
    subject: string,
    bodyText: string
  ): Promise<LocalizedEmailContent> {
    const blocks = this.textToBlocks(bodyText);
    return this.updateLocalizedEmailContent(id, {
      subject,
      blocks,
    });
  }

  // ===========================================================================
  // Email Settings Operations
  // ===========================================================================

  /**
   * Get email settings by ID
   */
  async getEmail(id: string): Promise<IntercomEmail> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.email.replace(':id', id)}?app_id=${appId}`;

    const response = await this.request<IntercomEmail>(endpoint, 'GET', headers);

    if (!response.success || !response.data) {
      throw new Error(`Failed to get email: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  // ===========================================================================
  // Ruleset (Campaign) Operations
  // ===========================================================================

  /**
   * Get ruleset (campaign) by ID
   * The ruleset contains targeting rules and links to email content
   */
  async getRuleset(id: string): Promise<Ruleset> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.ruleset.replace(':id', id)}?app_id=${appId}`;

    const response = await this.request<Ruleset>(endpoint, 'GET', headers);

    if (!response.success || !response.data) {
      throw new Error(`Failed to get ruleset: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Update ruleset targeting rules
   */
  async updateRuleset(id: string, updates: Partial<Ruleset>): Promise<Ruleset> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.ruleset.replace(':id', id)}?app_id=${appId}`;

    const payload = {
      'matching-system/ruleset': {
        id,
        ...updates,
      },
    };

    const response = await this.request<Ruleset>(endpoint, 'PUT', headers, payload);

    if (!response.success || !response.data) {
      throw new Error(`Failed to update ruleset: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  // ===========================================================================
  // Series Operations
  // ===========================================================================

  /**
   * Get a Series by ID
   * A Series is a multi-step automated message flow
   */
  async getSeries(id: string): Promise<Series> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.series.replace(':id', id)}?app_id=${appId}`;

    const response = await this.request<Series>(endpoint, 'GET', headers);

    if (!response.success || !response.data) {
      throw new Error(`Failed to get series: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Update a Series
   * Use this to modify nodes, connections, or settings
   */
  async updateSeries(id: string, updates: Partial<Series>): Promise<Series> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();
    const endpoint = `${ENDPOINTS.series.replace(':id', id)}?app_id=${appId}`;

    // Intercom uses Ember Data JSON API format
    const payload = {
      'series/series': {
        id,
        ...updates,
      },
    };

    const response = await this.request<Series>(endpoint, 'PUT', headers, payload);

    if (!response.success || !response.data) {
      throw new Error(`Failed to update series: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Create a new Series
   * POST /ember/series/series
   */
  async createSeries(templateId: string | null = null): Promise<{ id: string }> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();

    const payload = {
      app_id: appId,
      template_id: templateId,
    };

    const response = await this.request<{ id: string }>(
      ENDPOINTS.seriesCreate,
      'POST',
      headers,
      payload
    );

    if (!response.success || !response.data) {
      throw new Error(`Failed to create series: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Add a node to a Series
   * POST /ember/series/nodes
   * @param seriesId - The series to add the node to
   * @param objectType - Node type code (51 = entry-rules, etc.)
   * @param objectData - Additional node configuration
   */
  async addSeriesNode(
    seriesId: string,
    objectType: number,
    objectData: Record<string, unknown> = {}
  ): Promise<{ id: string; ruleset_id?: string }> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();

    const payload = {
      app_id: appId,
      series_id: seriesId,
      object_type: objectType,
      object_data: objectData,
    };

    const response = await this.request<{ id: string; ruleset_id?: string }>(
      ENDPOINTS.seriesNodes,
      'POST',
      headers,
      payload
    );

    if (!response.success || !response.data) {
      throw new Error(`Failed to add series node: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * Update a ruleset (used for entry rules predicates)
   * This is a raw update that accepts the full payload format from Intercom
   */
  async updateRulesetRaw(id: string, payload: Record<string, unknown>): Promise<unknown> {
    const headers = await this.auth.getAuthHeaders();
    const endpoint = `${ENDPOINTS.ruleset.replace(':id', id)}`;

    const response = await this.request<unknown>(endpoint, 'PUT', headers, payload);

    if (!response.success) {
      throw new Error(`Failed to update ruleset: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data;
  }

  /**
   * List all Series (not yet implemented - endpoint TBD)
   */
  async listSeries(): Promise<SeriesResult[]> {
    // TODO: Discover the list endpoint via network inspection
    console.warn('[IntercomAdapter] listSeries: Endpoint discovery pending');
    return [];
  }

  // ===========================================================================
  // Legacy Template Operations (for backwards compatibility)
  // ===========================================================================

  /**
   * Create an email template in Intercom
   * Note: This creates a full campaign with email content
   */
  async createEmailTemplate(template: EmailTemplate): Promise<TemplateResult> {
    // For now, log the intent - full implementation requires creating:
    // 1. A new ruleset
    // 2. A ruleset link
    // 3. An email
    // 4. Localized email content
    console.warn('[IntercomAdapter] createEmailTemplate: Full implementation pending');
    console.warn('[IntercomAdapter] Template:', JSON.stringify(template, null, 2));

    // Return mock result for now
    return {
      id: `tmpl_${Date.now()}`,
      name: template.name,
      createdAt: new Date().toISOString(),
      status: 'draft',
    };
  }

  /**
   * Update an existing email template
   */
  async updateEmailTemplate(id: string, template: Partial<EmailTemplate>): Promise<TemplateResult> {
    // For a real implementation, we'd need to:
    // 1. Find the localized email content ID from the template/ruleset
    // 2. Update the content using updateLocalizedEmailContent
    console.warn('[IntercomAdapter] updateEmailTemplate: Full implementation pending');

    return {
      id,
      name: template.name || 'Updated',
      createdAt: new Date().toISOString(),
      status: 'draft',
    };
  }

  /**
   * List all templates
   */
  async listTemplates(): Promise<TemplateResult[]> {
    const headers = await this.auth.getAuthHeaders();
    const appId = await this.auth.getAppId();

    const response = await this.request<TemplateResult[]>(
      `${ENDPOINTS.templates}?app_id=${appId}`,
      'GET',
      headers
    );

    if (!response.success) {
      throw new Error(`Failed to list templates: ${response.error?.message || 'Unknown error'}`);
    }

    return response.data || [];
  }

  // ===========================================================================
  // Connection Testing
  // ===========================================================================

  /**
   * Test connection to Intercom
   */
  async testConnection(): Promise<boolean> {
    try {
      const headers = await this.auth.getAuthHeaders();

      // Use ping endpoint for connection test
      const response = await this.request(ENDPOINTS.ping, 'POST', headers, {});

      return response.success;
    } catch {
      return false;
    }
  }

  // ===========================================================================
  // Helper Methods
  // ===========================================================================

  /**
   * Convert plain text to Intercom's blocks format
   */
  private textToBlocks(text: string): EmailBlocks {
    // Split text into paragraphs
    const paragraphs = text.split(/\n\n+/).filter(Boolean);

    const contentBlocks: EmailContentBlock[] = paragraphs.map((para) => ({
      text: para.replace(/\n/g, '<br>'),
      align: 'left' as const,
      type: 'paragraph' as const,
    }));

    const section: EmailSectionBlock = {
      responsive: false,
      container: true,
      sectionType: 'content',
      rows: [
        {
          cells: [
            {
              style: {
                paddingTop: '35px',
                paddingBottom: '30px',
                paddingLeft: '40px',
                paddingRight: '40px',
              },
              content: contentBlocks,
            },
          ],
        },
      ],
    };

    return { blocks: [section] };
  }

  /**
   * Make an authenticated request to Intercom's internal API
   */
  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers: AuthHeaders | Record<string, string>,
    body?: unknown
  ): Promise<IntercomApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: headers as Record<string, string>,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: errorText || `HTTP ${response.status}`,
          },
        };
      }

      // Handle empty responses (like ping)
      const text = await response.text();
      if (!text) {
        return { success: true };
      }

      const data = JSON.parse(text) as T;
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: error instanceof Error ? error.message : 'Unknown fetch error',
        },
      };
    }
  }
}
