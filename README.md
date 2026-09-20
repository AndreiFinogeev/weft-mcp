# Weft MCP Server

Drive your [Weft](https://letsweft.com) Scrumban board from any MCP client —
capture tasks from conversation, move work across Backlog → Todo → Doing →
Done, and plan time-boxed sprints, just by asking your AI.

Weft is an AI-first Scrumban task manager for solo founders and small startup
teams. One hosted MCP server means VS Code, Claude, ChatGPT, Cursor, Copilot
CLI, JetBrains, Kiro, Codex, Gemini CLI, Warp, goose, Raycast, Perplexity,
Grok, Le Chat and a dozen more can all manage the same board — no extra
plugins needed. Twenty-two of them have a copy-paste setup guide at
[letsweft.com/integrations](https://letsweft.com/integrations).

## Server

| | |
|---|---|
| Endpoint | `https://letsweft.com/api/mcp` |
| Transport | Streamable HTTP (MCP 2025-11-25) |
| Auth | OAuth 2.1 — Authorization Code + PKCE, dynamic client registration (RFC 7591). No API keys: a browser window opens to sign in with your Weft account on first use. |
| Manifest | [`/.well-known/mcp.json`](https://letsweft.com/.well-known/mcp.json) |

A free account takes a minute: [letsweft.com/sign-up](https://letsweft.com/sign-up)
— 50 tasks included.

## Install

**VS Code** — add to `.vscode/mcp.json` (or run "MCP: Open User Configuration"
for every workspace at once):

```json
{ "servers": { "weft": { "type": "http", "url": "https://letsweft.com/api/mcp" } } }
```

Then switch Chat to Agent mode and ask for your board; VS Code opens a browser
for OAuth the first time.

**GitHub Copilot CLI** — run `copilot`, type `/mcp add`, choose HTTP, paste the
endpoint, leave headers empty, set tools to `*`.

**Claude Code**

```bash
claude mcp add --transport http weft https://letsweft.com/api/mcp
```

**Cursor** — [Add to Cursor](https://cursor.com/en/install-mcp?name=weft&config=eyJ1cmwiOiJodHRwczovL2xldHN3ZWZ0LmNvbS9hcGkvbWNwIn0%3D), or add to `~/.cursor/mcp.json`:

```json
{ "mcpServers": { "weft": { "url": "https://letsweft.com/api/mcp" } } }
```

**Replit** — [Add to Replit](https://replit.com/integrations?mcp=eyJkaXNwbGF5TmFtZSI6IldlZnQiLCJiYXNlVXJsIjoiaHR0cHM6Ly9sZXRzd2VmdC5jb20vYXBpL21jcCJ9), or Integrations → "MCP Servers for Replit Agent" → "Add MCP server".

**ChatGPT** — published plugin: Plugins → search "Weft" → Connect.

**Codex CLI**

```bash
codex mcp add weft --transport http --url https://letsweft.com/api/mcp
```

**Gemini CLI** — official extension:

```bash
gemini extensions install https://github.com/AndreiFinogeev/weft-gemini-extension
```

**JetBrains (via Junie) / Kiro / Warp / goose / Raycast / Perplexity / Grok /
Le Chat / Claude Desktop / Lovable / Windsurf / Cline / Zed / anything else** — add
`https://letsweft.com/api/mcp` as a remote MCP server (custom connector) and
complete OAuth. Per-client walkthroughs: [letsweft.com/integrations](https://letsweft.com/integrations).

## Tools (32)

| Category | Tools |
|---|---|
| Search | `search`, `fetch` |
| Board | `initialize_board`, `get_board_state`, `list_columns`, `get_my_work`, `get_context` |
| Tasks | `list_tasks`, `create_task`, `bulk_create_tasks`, `update_task`, `move_task`, `start_task`, `report_progress`, `request_input`, `submit_answer`, `complete_task`, `record_decision`, `get_task_history`, `trash_task`, `restore_task`, `archive_done_tasks` |
| Projects | `list_projects`, `create_project`, `update_project` |
| Sprints | `list_sprints`, `get_active_sprint`, `create_sprint`, `start_sprint`, `complete_sprint`, `add_task_to_sprint`, `remove_task_from_sprint` |

Destructive tools carry MCP safety annotations; deleting is safe —
`trash_task` keeps tasks recoverable for 30 days. Full reference:
[letsweft.com/docs/mcp-tools](https://letsweft.com/docs/mcp-tools).

## What you can ask

- "Add a high-priority task: fix the flaky CI test."
- "What am I working on right now?"
- "Move the auth refactor to Done."
- "Start a one-week sprint focused on the landing redesign."
- "Organize my board into projects."

## Privacy & security

Your board is private: every session is scoped to your account via OAuth,
and tokens are issued per client. Tasks created by AI carry creator
attribution, so the board always shows who (or what) added each card.

## Support

- Docs: [letsweft.com/docs](https://letsweft.com/docs)
- Email: support@letsweft.com
- Privacy: [letsweft.com/privacy](https://letsweft.com/privacy)
