# Installing the Weft MCP server (instructions for AI agents)

Weft is a **hosted, remote** MCP server. There is nothing to clone, build or
run locally — no npm install, no Docker, no environment variables. Setting it
up means adding one URL to the host's MCP configuration.

| | |
|---|---|
| Endpoint | `https://letsweft.com/api/mcp` |
| Transport | Streamable HTTP (MCP 2025-11-25) |
| Auth | OAuth 2.1 (Authorization Code + PKCE, dynamic client registration) **or** a Weft access token sent as `Authorization: Bearer …` |

A free Weft account is required: https://letsweft.com/sign-up (50 tasks
included, no card).

## Cline

### Option A — OAuth, in the VS Code extension (no secrets to handle)

1. Open the Cline panel → **MCP Servers** → **Remote Servers** → **Add Remote Server**.
2. Server name: `weft`. Server URL: `https://letsweft.com/api/mcp`.
3. A browser window opens; sign in to Weft and approve access. Cline registers
   itself dynamically — there is no client ID or secret to paste.

### Option B — access token (works anywhere a config file does, including the CLI)

1. Sign in at https://letsweft.com and create an access token:
   https://letsweft.com/docs/access-tokens
2. Add the server to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "weft": {
      "type": "streamableHttp",
      "url": "https://letsweft.com/api/mcp",
      "headers": { "Authorization": "Bearer WEFT_ACCESS_TOKEN" },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Replace `WEFT_ACCESS_TOKEN` with the token from step 1. The token is shown
once, carries the same permissions as the signed-in account, and can be
revoked from the same page.

## Verifying the install

Ask: **"What's in my Weft Backlog?"** — the agent should call `list_tasks` (or
`get_board_state`) and answer with the board. On a brand-new account the board
is empty until `initialize_board` is called; asking "set up my Weft board"
does that.

An unauthenticated request is *supposed* to fail: `https://letsweft.com/api/mcp`
answers `401` with a `WWW-Authenticate: Bearer resource_metadata=…` header, as
MCP and OAuth 2.1 require. That 401 is the discovery handshake, not a broken
server.

## Troubleshooting

- **"Connection failed" right after adding the URL** — the OAuth window was
  closed before approval. Remove the server and add it again, or use Option B.
- **The host has no "Add Remote Server" button** — it only supports stdio.
  Bridge it: `npx -y mcp-remote https://letsweft.com/api/mcp`.
- **Tools list is empty** — the account is fine but the client cached an old
  session; disable and re-enable the server in the MCP panel.

Full per-client walkthroughs (33 clients): https://letsweft.com/integrations
Tool reference (32 tools): https://letsweft.com/docs/mcp-tools
Support: support@letsweft.com
