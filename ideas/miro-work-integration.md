# Miro Integration Plan (Tatoma - Work)

**Created:** 2026-01-07
**Purpose:** Read-only access to Tatoma Miro workspace for visual context in planning, project discussions, and COPE briefings

---

## Background

Tatoma uses Miro for visual collaboration - project roadmaps, architecture diagrams, workshop outputs, and strategic planning boards. Having read access would let COPE:
- Reference diagrams during planning sessions
- Pull context from strategic boards
- Understand visual artifacts mentioned in Slack/meetings
- Include board status in briefings

---

## Integration Options

### Option 1: Official Miro MCP (Recommended)

Miro's official MCP server with OAuth 2.1 and enterprise compliance. **Best choice since Israel is org admin.**

#### Why Official

| Factor | Official | Community Options |
|--------|----------|-------------------|
| Auth | OAuth 2.1 (no token to manage) | Manual API token |
| Security | Enterprise-grade, compliant | Self-managed |
| Maintenance | Miro maintains it | Could be abandoned |
| Setup | Enable + OAuth flow | Create app, copy token |
| Long-term | Future-proof | May break with API changes |
| Audit | Proper enterprise audit trail | Manual tracking |

#### Capabilities

- Read and understand content from Miro boards
- Generate diagrams from code, text, GitHub URLs, PRDs
- Transform visual information into code/other formats
- Full workspace access (read and write)

#### Setup (Admin)

1. **Enable MCP Server**
   - Go to Miro Organization Settings
   - Navigate to Integrations
   - Enable "MCP Server"

2. **Connect in Claude Code**
   - MCP will prompt OAuth flow on first use
   - Authorize Tatoma workspace access
   - No tokens to store or manage

3. **Configure Scope (Optional)**
   - Select specific boards or full workspace
   - Permissions follow your Miro user permissions

#### Supported Clients

Claude Code, Cursor, VSCode/GitHub Copilot, Windsurf, and others.

#### Notes

- Currently in beta (feature set may evolve)
- Rate limiting protects against overuse
- Dynamic client registration for security

---

### Option 2: k-jarzyna/mcp-miro (Community Alternative)

Most feature-rich community MCP server with 80+ tools. NPX-installable, supports multi-board access. **Use if official MCP doesn't meet needs.**

#### Installation

```json
{
  "mcpServers": {
    "miro-work": {
      "command": "npx",
      "args": ["@k-jarzyna/mcp-miro"],
      "env": {
        "MIRO_ACCESS_TOKEN": "${MIRO_TATOMA_TOKEN}"
      }
    }
  }
}
```

#### Available Tools (Key Read Operations)

| Tool | Purpose |
|------|---------|
| `get_boards` | List all accessible boards |
| `get_board` | Get board metadata |
| `get_all_items` | List items on a board |
| `get_sticky_note` | Read sticky note content |
| `get_card` | Read card details |
| `get_frame` | Get frame (section) contents |
| `get_text` | Read text items |
| `get_shape` | Get shape with labels |
| `get_connector` | Read relationships between items |
| `get_mindmap_node` | Access mindmap structures |

#### Full Capability Set

- **Boards**: create, read, update, delete, copy
- **Items**: sticky notes, cards, app cards, text, shapes, images, embeds, frames, documents, connectors, mindmap nodes
- **Bulk operations**: create multiple items, file uploads
- **Organization**: tags, members, groups

#### Authentication (if using community option)

**Required Scopes:**

| Scope | Purpose | Read-Only? |
|-------|---------|------------|
| `boards:read` | Access board data | Yes |
| `identity:read` | Identify user | Yes |
| `team:read` | Access team boards | Yes |
| `boards:write` | Modify boards | No (skip for read-only) |

**To Get Token:**

1. Go to [Miro Developer Portal](https://miro.com/app/settings/user-profile/apps)
2. Create new app
3. Select Tatoma team/workspace
4. Add `boards:read`, `identity:read`, `team:read` scopes only
5. Install app → Get OAuth token
6. Store as `MIRO_TATOMA_TOKEN`

---

### Option 3: LuotoCompany/mcp-server-miro

FastMCP-based, auto-generates tools from Miro OpenAPI spec. **Single board per instance.**

#### Installation (Docker)

```json
{
  "mcpServers": {
    "miro-work": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-e", "MIRO_API_TOKEN=${MIRO_TATOMA_TOKEN}",
        "-e", "MIRO_BOARD_ID=${MIRO_TARGET_BOARD}",
        "-p", "8899:8899",
        "luotocompany/mcp-server-miro"
      ]
    }
  }
}
```

**Limitation:** One board per instance. Need multiple configs for multiple boards.

---

## Security Considerations

### Read-Only Usage

Even though official MCP provides full read/write access, the skill can be designed for read-only operations:

1. Skill workflows only use read operations
2. Write capabilities available for future use if needed
3. Aligns with "observe first" principle for work tools

---

## Skill Design: MiroWork

**Scope:** Read-only access to Tatoma Miro workspace

### Quick Commands

| Command | Action |
|---------|--------|
| "show miro boards" | List accessible boards |
| "what's on the roadmap board" | Summarize board contents |
| "find diagram about X" | Search across boards |
| "show the architecture diagram" | Get specific board content |

### Workflow Routing

| Workflow | Trigger |
|----------|---------|
| **ListBoards** | "miro boards", "what boards", "show boards" |
| **BoardSummary** | "what's on [board]", "summarize [board]" |
| **SearchBoards** | "find in miro", "search miro", "diagram about" |
| **GetDiagram** | "show diagram", "architecture diagram", "get board" |

### COPE Integration

**Daily Briefing (optional):**
```
📋 MIRO BOARDS
   Recently updated: 3
   - Q1 Roadmap (updated yesterday by Sander)
   - Architecture Overview (3 days ago)

   Boards mentioned in Slack: 1
   - #product referenced "API Design Board"
```

**Strategic Reviews:**
- Pull roadmap visuals during planning
- Reference architecture during technical discussions
- Access workshop outputs for context

---

## Use Cases

### 1. Project Context
```
User: "What does our architecture look like?"
→ Fetches Architecture board
→ Extracts shapes, connectors, text
→ Returns structured summary
```

### 2. Roadmap Reference
```
User: "What's planned for Q1?"
→ Finds Q1 Roadmap board
→ Extracts cards, sticky notes, frames
→ Returns prioritized items
```

### 3. Meeting Prep
```
User: "I have a meeting about the Gynzy project"
→ Searches boards for "Gynzy"
→ Summarizes relevant visual content
→ Provides context for discussion
```

### 4. Slack Cross-Reference
```
In #product: "See the diagram in Miro"
→ Proactively fetches referenced board
→ Includes visual summary in Slack digest
```

---

## Implementation Steps

### Phase 1: Basic Integration

1. **Create Miro App** (read-only scopes)
2. **Configure MCP Server** (k-jarzyna recommended)
3. **Test board access**
4. **Create MiroWork skill** (read operations only)

### Phase 2: COPE Integration

1. **Add to briefing** (optional board activity)
2. **Cross-reference Slack mentions** of Miro boards
3. **Strategic review integration**

### Phase 3: Future (if needed)

- Write operations (create stickies from action items)
- Board templates for recurring processes
- Automated diagram generation

---

## Config Files Needed

### `Config/boards.yaml`

```yaml
# Key boards to track
tracked_boards:
  - name: "Q1 Roadmap"
    id: "board-id-here"
    purpose: "Quarterly planning"

  - name: "Architecture Overview"
    id: "board-id-here"
    purpose: "System architecture"

  - name: "Product Backlog"
    id: "board-id-here"
    purpose: "Feature planning"
```

### `Config/settings.yaml`

```yaml
miro:
  team: "tatoma"
  read_only: true
  include_in_briefing: false  # Start conservative
  search_limit: 10
```

---

## Recommendation

**Use Official Miro MCP** because:

1. **OAuth 2.1** — No tokens to manage, automatic refresh
2. **Enterprise-grade** — Proper security, audit trail, compliance
3. **Miro-maintained** — Future-proof, won't break with API changes
4. **Admin access** — Israel can enable immediately, no approval needed
5. **Cleaner setup** — Enable in org settings, OAuth flow, done

**Start conservative:**
- Use read operations only in skill workflows
- Don't include in daily briefing initially
- Add proactive features after testing
- Write capabilities available if needed later

---

## Sources

- [Official Miro MCP Documentation](https://developers.miro.com/docs/miro-mcp)
- [k-jarzyna/mcp-miro (GitHub)](https://github.com/k-jarzyna/mcp-miro)
- [LuotoCompany/mcp-server-miro (GitHub)](https://github.com/LuotoCompany/mcp-server-miro)
- [Miro MCP Server Help Center](https://help.miro.com/hc/en-us/articles/31624028247058-Miro-MCP-Server-overview)
- [MCP Specification (Nov 2025)](https://modelcontextprotocol.io/specification/2025-11-25)
