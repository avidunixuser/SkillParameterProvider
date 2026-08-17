import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "parameter-provider",
  version: "1.0.0"
});

server.tool(
  "get_parameters",
  "Get parameters from the user",
  {
    required: z.array(z.string()),
    existing: z.record(z.string()).optional()
  },
  async ({ required, existing = {} }) => {
    const missing = required.filter(x => !existing[x]);

    if (missing.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(existing, null, 2)
          }
        ]
      };
    }

    const result = await server.server.elicitInput({
      mode: "form",
      message: "Please provide the missing values.",
      requestedSchema: {
        type: "object",
        properties: Object.fromEntries(
          missing.map(name => [
            name,
            {
              type: "string",
              description: `${name} value`
            }
          ])
        ),
        required: missing
      }
    });

    const values = result.action === "accept"
      ? { ...existing, ...(result.content ?? {}) }
      : { ...existing, status: result.action };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(values, null, 2)
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);