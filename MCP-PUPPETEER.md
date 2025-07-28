# Puppeteer MCP Server

This directory contains a Puppeteer MCP (Model Context Protocol) server that allows Claude to control a web browser programmatically.

## Features

The MCP server provides the following tools:

- **puppeteer_launch**: Launch a new browser instance with configurable options
- **puppeteer_navigate**: Navigate to any URL
- **puppeteer_screenshot**: Take screenshots of the current page
- **puppeteer_get_content**: Get HTML content of the current page
- **puppeteer_click**: Click on elements using CSS selectors
- **puppeteer_type**: Type text into input fields
- **puppeteer_evaluate**: Execute JavaScript in the browser context
- **puppeteer_close**: Close the browser instance

## Usage

### Starting the Server

```bash
npm run mcp-server
```

### Testing the Server

```bash
node verify-mcp.js
```

## Example MCP Configuration

Add this to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npm",
      "args": ["run", "mcp-server"],
      "cwd": "/path/to/isabell-klingert-website"
    }
  }
}
```

## Dependencies

- **puppeteer**: Web browser automation
- **@modelcontextprotocol/sdk**: MCP server implementation
- **tsx**: TypeScript execution runtime

## Security Notes

- The server runs browsers in sandboxed mode with security flags
- No file system access beyond screenshot saving
- JavaScript execution is limited to browser context
- Headless mode is used by default for security

## Development

The server is implemented in TypeScript (`puppeteer-mcp-server.ts`) and follows MCP protocol specifications for tool registration and execution.