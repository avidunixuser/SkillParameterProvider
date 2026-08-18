# Skill Parameter Provider

A minimal Model Context Protocol (MCP) server that helps agent skills collect
information they need from users.

The server exposes a `get_parameters` tool. A skill supplies a list of required
parameter names and any values it already knows. The tool prompts the user for
only the missing values through an MCP form, then returns the combined values as
JSON.

## Setup

1. Install dependencies:
   Configure npm to use the Microsoft package feed proxy:
   
   ```sh
   npm config set registry https://packagefeedproxy.microsoft.io/npm/
   npm install
   ```

3. Open this repository as a workspace in VS Code.

The shared [`.vscode/mcp.json`](.vscode/mcp.json) configuration starts the
server with Node.js. VS Code may ask you to trust and start the MCP server the
first time it is used.

## Tool Input

A simple example skill, `architecture-review`, is included at `/.github/skills/architecture-review`

```json
{
  "required": ["customer_name", "workload_name", "environment"],
  "existing": {
    "location": "eastus"
  }
}
```

In this example, the user is prompted for `customer_name`, `workload_name` and `environment`.
The existing `location` value is retained. If the user cancels or declines the
form, the response includes the resulting action in `status`.

Agent skills can call this tool whenever they cannot proceed without additional
user-provided parameters.
