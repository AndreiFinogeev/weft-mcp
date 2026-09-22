# Weft MCP Server

[![Weft MCP connector – tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/com.letsweft/weft/badges/score.svg)](https://glama.ai/mcp/connectors/com.letsweft/weft)

Drive your [Weft](https://letsweft.com/?utm_source=github-weft-mcp&utm_medium=repo&utm_campaign=evergreen) Scrumban board from any MCP client —
capture tasks from conversation, move work across Backlog → Todo → Doing →
Done, and plan time-boxed sprints, just by asking your AI.

Weft is an AI-first Scrumban task manager for solo founders and small startup
teams. One hosted MCP server means VS Code, Claude, ChatGPT, Cursor, Copilot
CLI, JetBrains, Kiro, Codex, Gemini CLI, Warp, goose, Raycast, Perplexity,
Grok, Le Chat and a dozen more can all manage the same board — no extra
plugins needed. Twenty-two of them have a copy-paste setup guide.

What makes it a board for agents rather than a to-do list with an API: an
agent **claims** a task with a lease, **reports progress** to keep it, and
finishes with a **receipt** — artifacts you can check, and what it did not
do — which you accept or send back from an Inbox, on the web or your phone.
When it needs a decision only you can make, the question waits for you
instead of being guessed at.

## Server

| | |
|---|---|
| Endpoint | `https://letsweft.com/api/mcp` |
| Transport | Streamable HTTP (MCP 2025-11-25) |
| Auth | OAuth 2.1 — Authorization Code + PKCE, dynamic client registration (RFC 7591). No API keys: a browser window opens to sign in with your Weft account on first use. |
| Manifest | [`/.well-known/mcp.json`](https://letsweft.com/.well-known/mcp.json) |
| Registry | Published in the official MCP Registry as `com.letsweft/weft` (domain-verified namespace) |

A free account takes a minute: [letsweft.com/sign-up](https://letsweft.com/sign-up?utm_source=github-weft-mcp&utm_medium=repo&utm_campaign=evergreen)
— 50 tasks included.

## Install

Setting this up from inside an agent (Cline, Cursor, a CLI)? Point it at
[](./llms-install.md) — the same steps, written for a machine.

**VS Code** — add to `.vscode/mcp.json`, or run "MCP: Open User Configuration"
to have it in every workspace:

```json
{ "servers": { "weft": { "type": "http", "url": "https://letsweft.com/api/mcp" } } }
```

Switch Chat to Agent mode and ask for your board; VS Code opens a browser for
OAuth the first time.

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
complete OAuth. Per-client walkthroughs: [letsweft.com/integrations](https://letsweft.com/integrations?utm_source=github-weft-mcp&utm_medium=repo&utm_campaign=evergreen).

## Tools (32)

| Category | Tools |
|---|---|
| Search | `search`, `fetch` |
| Board | `initialize_board`, `get_board_state`, `list_columns` |
| Tasks | `list_tasks`, `create_task`, `bulk_create_tasks`, `update_task`, `move_task`, `trash_task`, `restore_task`, `archive_done_tasks` |
| Doing the work | `get_my_work`, `start_task`, `report_progress`, `complete_task` |
| Asking the human | `request_input`, `submit_answer` |
| Memory of decisions | `record_decision`, `get_context`, `get_task_history` |
| Projects | `list_projects`, `create_project`, `update_project` |
| Sprints | `list_sprints`, `get_active_sprint`, `create_sprint`, `start_sprint`, `complete_sprint`, `add_task_to_sprint`, `remove_task_from_sprint` |

The four in **Doing the work** are the ones that make this a board for agents
rather than a to-do list with an API. `start_task` CLAIMS a task with a lease
and returns a `runId` and `leaseToken`; `report_progress` renews the claim,
because an agent that dies mid-run cannot report anything and silence is the
only signal the board has. `complete_task` takes a structured receipt —
artifacts a person can check, claims, what was explicitly NOT done — and when
the task carries machine-checkable verification, the server re-runs those
checks itself before the card moves to Done.

`request_input` is the other half: a question only the person can answer
survives the session it was asked in, waits in their Inbox (web or phone), and
comes back to whichever client asked.

Destructive tools carry MCP safety annotations; deleting is safe —
`trash_task` keeps tasks recoverable for 30 days. Full reference:
[letsweft.com/docs/mcp-tools](https://letsweft.com/docs/mcp-tools?utm_source=github-weft-mcp&utm_medium=repo&utm_campaign=evergreen).

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

- Docs: [letsweft.com/docs](https://letsweft.com/docs?utm_source=github-weft-mcp&utm_medium=repo&utm_campaign=evergreen)
- Email: support@letsweft.com
- Privacy: [letsweft.com/privacy](https://letsweft.com/privacy?utm_source=github-weft-mcp&utm_medium=repo&utm_campaign=evergreen)
