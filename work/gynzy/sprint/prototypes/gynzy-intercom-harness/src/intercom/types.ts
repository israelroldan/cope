/**
 * Intercom Internal API Types
 *
 * These types represent the payloads used by Intercom's internal web API.
 * Discovered via reverse engineering on January 14, 2026.
 *
 * Model Hierarchies:
 *   Single Email: Ruleset -> RulesetLink -> Email -> LocalizedEmailContent
 *   Series: Series -> SeriesNode[] -> (Email/Wait/etc.)
 */

// =============================================================================
// Authentication Types
// =============================================================================

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  sessionCookie: string;
  csrfToken: string;
  appId: string;
  adminId: number;
  expiresAt: Date;
}

export interface AuthHeaders {
  Cookie: string;
  'X-CSRF-Token': string;
  'X-EMBERCOM-REVISION-ID': string;
  'X-EMBERCOM-SHA': string;
  'Content-Type': string;
  Accept: string;
}

// =============================================================================
// Email Content Types (emails/localized-email-content)
// =============================================================================

/**
 * A paragraph or content element within an email cell
 */
export interface EmailContentBlock {
  text: string;
  align: 'left' | 'center' | 'right';
  type: 'paragraph' | 'heading' | 'button' | 'image';
}

/**
 * A cell within an email row
 */
export interface EmailCell {
  style: {
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    backgroundColor?: string;
  };
  content: EmailContentBlock[];
}

/**
 * A row within an email section
 */
export interface EmailRow {
  cells: EmailCell[];
}

/**
 * A section block in the email body
 */
export interface EmailSectionBlock {
  responsive: boolean;
  container: boolean;
  sectionType: 'content' | 'header' | 'footer';
  rows: EmailRow[];
}

/**
 * The body structure used by Intercom emails
 */
export interface EmailBlocks {
  blocks: EmailSectionBlock[];
}

/**
 * Localized email content - the actual content model
 * Endpoint: /ember/emails/localized_email_contents/{id}
 */
export interface LocalizedEmailContent {
  id: string;
  blocks: EmailBlocks;
  subjectBlocks?: EmailBlocks;
  subject?: string;
  locale: string;
  assignToId?: number;
  assignToType?: string;
  emailTemplateType?: string;
  emailTemplateId?: string;
  senderType?: string;
  senderId?: number;
  replyToType?: string;
  replyToId?: number;
}

/**
 * Email settings model
 * Endpoint: /ember/emails/emails/{id}
 */
export interface IntercomEmail {
  id: string;
  sendToUnsubscribed: boolean;
  showUnsubscribeLink: boolean;
  isLegallyMandated: boolean;
  linkFontWeight?: string;
  linkFontColor?: string;
  linkFontStyle?: string;
  contentBackgroundColor?: string;
  bodyBackgroundColor?: string;
  localizedEmailContents: LocalizedEmailContent[];
}

// =============================================================================
// Ruleset Types (matching-system/ruleset)
// =============================================================================

/**
 * Predicate for audience targeting
 */
export interface RulesetPredicate {
  attribute: string;
  comparison: 'eq' | 'neq' | 'gt' | 'lt' | 'in' | 'contains';
  type: 'string' | 'number' | 'date' | 'role';
  value: string | number | string[];
}

/**
 * Predicate group for audience targeting
 */
export interface PredicateGroup {
  predicates: RulesetPredicate[];
}

/**
 * Link to an email within a ruleset
 * Endpoint: /ember/matching_system/ruleset_links/{id}
 */
export interface RulesetLink {
  id: string;
  state: number;
  type: string;
  matchingLocations: string[];
  wentLiveAt: string | null;
  objectType: string;
  objectId: string;
}

/**
 * Campaign ruleset - the top-level container
 * Endpoint: /ember/matching_system/rulesets/{id}
 */
export interface Ruleset {
  id: string;
  state: number; // 0 = draft, 1 = live
  matchBehavior: number;
  predicateGroup: PredicateGroup;
  clientPredicateGroup: PredicateGroup;
  rolePredicateGroup: PredicateGroup;
  defaultPredicateGroup: PredicateGroup;
  matchingTimetable?: unknown;
  recurringSchedule?: unknown;
  scheduledActivation?: string | null;
  scheduledDeactivation?: string | null;
  goal?: unknown;
  utmSettings?: unknown;
  seriesRelation?: unknown;
  createdAt: string;
  matchSpacingPeriod?: number;
  maxMatchCount?: number;
  segmentIds?: string[];
  environmentIds?: string[];
  rulesetLinks: RulesetLink[];
}

// =============================================================================
// API Response Types
// =============================================================================

export interface IntercomApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// =============================================================================
// Content Generation Types (for the harness)
// =============================================================================

export interface ContentVariant {
  locale: 'nl' | 'be';
  subject: string;
  body: string;
  preheader?: string;
}

export interface GeneratedContent {
  goal: string;
  segment: string;
  tone: string;
  variants: ContentVariant[];
  reasoning: string;
}

/**
 * Legacy template interface (for backwards compatibility)
 */
export interface EmailTemplate {
  name: string;
  subject: string;
  body: string; // HTML content
  fromName?: string;
  replyTo?: string;
  locale?: 'nl' | 'be' | 'en';
  metadata?: Record<string, unknown>;
}

export interface TemplateResult {
  id: string;
  name: string;
  createdAt: string;
  status: 'draft' | 'active';
}

// =============================================================================
// Series Types (series/series)
// =============================================================================

/**
 * Node types available in an Intercom Series
 */
export type SeriesNodeType =
  | 'entry-rules'
  | 'email'
  | 'chat'
  | 'post'
  | 'wait'
  | 'workflow'
  | 'tour'
  | 'banner'
  | 'push'
  | 'carousel';

/**
 * Connection output types from nodes
 */
export type SeriesConnectionType =
  | 'when-matched'
  | 'when-sent'
  | 'when-passed'
  | 'when-opened'
  | 'when-clicked';

/**
 * A node within a Series flow
 * Endpoint: Part of /ember/series/series/{id} response
 */
export interface SeriesNode {
  id: string;
  type: SeriesNodeType;
  position: {
    x: number;
    y: number;
  };
  data: {
    title?: string;
    // Entry rules node
    predicateGroup?: PredicateGroup;
    // Email node
    emailId?: string;
    localizedEmailContentId?: string;
    // Wait node
    waitDuration?: number;
    waitUnit?: 'minutes' | 'hours' | 'days' | 'weeks';
  };
  connections: SeriesConnection[];
}

/**
 * A connection between nodes in a Series
 */
export interface SeriesConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  connectionType: SeriesConnectionType;
}

/**
 * An edge in the Series graph (visual representation)
 */
export interface SeriesEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

/**
 * Intercom Series - a multi-step automated message flow
 * Endpoint: /ember/series/series/{id}
 */
export interface Series {
  id: string;
  name: string;
  state: number; // 0 = draft, 1 = live
  createdAt: string;
  updatedAt: string;
  nodes: SeriesNode[];
  edges: SeriesEdge[];
  entryRulesNodeId: string;
  // Statistics (when live)
  stats?: {
    entered: number;
    completed: number;
    exited: number;
  };
}

/**
 * Result of creating/updating a Series
 */
export interface SeriesResult {
  id: string;
  name: string;
  state: 'draft' | 'live';
  nodeCount: number;
  createdAt: string;
}

// =============================================================================
// Segment types (for future use)
// =============================================================================

export interface Segment {
  id: string;
  name: string;
  count: number;
  predicates: RulesetPredicate[];
}
