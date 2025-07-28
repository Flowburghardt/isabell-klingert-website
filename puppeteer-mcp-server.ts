#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import puppeteer, { Browser, Page } from 'puppeteer';

class PuppeteerMCPServer {
  private server: Server;
  private browser: Browser | null = null;
  private page: Page | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'puppeteer-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.cleanup();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'puppeteer_launch',
          description: 'Launch a new browser instance',
          inputSchema: {
            type: 'object',
            properties: {
              headless: {
                type: 'boolean',
                description: 'Run browser in headless mode',
                default: true,
              },
              width: {
                type: 'number',
                description: 'Browser width',
                default: 1280,
              },
              height: {
                type: 'number',
                description: 'Browser height',
                default: 720,
              },
            },
          },
        },
        {
          name: 'puppeteer_navigate',
          description: 'Navigate to a URL',
          inputSchema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL to navigate to',
              },
            },
            required: ['url'],
          },
        },
        {
          name: 'puppeteer_screenshot',
          description: 'Take a screenshot of the current page',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to save the screenshot',
              },
              fullPage: {
                type: 'boolean',
                description: 'Capture the full page',
                default: false,
              },
            },
          },
        },
        {
          name: 'puppeteer_get_content',
          description: 'Get the HTML content of the current page',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'puppeteer_click',
          description: 'Click on an element',
          inputSchema: {
            type: 'object',
            properties: {
              selector: {
                type: 'string',
                description: 'CSS selector for the element to click',
              },
            },
            required: ['selector'],
          },
        },
        {
          name: 'puppeteer_type',
          description: 'Type text into an input field',
          inputSchema: {
            type: 'object',
            properties: {
              selector: {
                type: 'string',
                description: 'CSS selector for the input element',
              },
              text: {
                type: 'string',
                description: 'Text to type',
              },
            },
            required: ['selector', 'text'],
          },
        },
        {
          name: 'puppeteer_evaluate',
          description: 'Execute JavaScript in the browser context',
          inputSchema: {
            type: 'object',
            properties: {
              script: {
                type: 'string',
                description: 'JavaScript code to execute',
              },
            },
            required: ['script'],
          },
        },
        {
          name: 'puppeteer_close',
          description: 'Close the browser instance',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'puppeteer_launch':
            return await this.handleLaunch(args);
          case 'puppeteer_navigate':
            return await this.handleNavigate(args);
          case 'puppeteer_screenshot':
            return await this.handleScreenshot(args);
          case 'puppeteer_get_content':
            return await this.handleGetContent();
          case 'puppeteer_click':
            return await this.handleClick(args);
          case 'puppeteer_type':
            return await this.handleType(args);
          case 'puppeteer_evaluate':
            return await this.handleEvaluate(args);
          case 'puppeteer_close':
            return await this.handleClose();
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private async handleLaunch(args: any) {
    const { headless = true, width = 1280, height = 720 } = args;

    if (this.browser) {
      await this.browser.close();
    }

    this.browser = await puppeteer.launch({
      headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    this.page = await this.browser.newPage();
    await this.page.setViewport({ width, height });

    return {
      content: [
        {
          type: 'text',
          text: `Browser launched successfully (${width}x${height}, headless: ${headless})`,
        },
      ],
    };
  }

  private async handleNavigate(args: any) {
    if (!this.page) {
      throw new Error('Browser not launched. Call puppeteer_launch first.');
    }

    const { url } = args;
    await this.page.goto(url, { waitUntil: 'networkidle2' });

    return {
      content: [
        {
          type: 'text',
          text: `Navigated to: ${url}`,
        },
      ],
    };
  }

  private async handleScreenshot(args: any) {
    if (!this.page) {
      throw new Error('Browser not launched. Call puppeteer_launch first.');
    }

    const { path, fullPage = false } = args;
    
    if (path) {
      await this.page.screenshot({ path, fullPage });
      return {
        content: [
          {
            type: 'text',
            text: `Screenshot saved to: ${path}`,
          },
        ],
      };
    } else {
      const screenshot = await this.page.screenshot({ encoding: 'base64', fullPage });
      return {
        content: [
          {
            type: 'text',
            text: `Screenshot taken (base64): data:image/png;base64,${screenshot}`,
          },
        ],
      };
    }
  }

  private async handleGetContent() {
    if (!this.page) {
      throw new Error('Browser not launched. Call puppeteer_launch first.');
    }

    const content = await this.page.content();
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  private async handleClick(args: any) {
    if (!this.page) {
      throw new Error('Browser not launched. Call puppeteer_launch first.');
    }

    const { selector } = args;
    await this.page.click(selector);

    return {
      content: [
        {
          type: 'text',
          text: `Clicked on element: ${selector}`,
        },
      ],
    };
  }

  private async handleType(args: any) {
    if (!this.page) {
      throw new Error('Browser not launched. Call puppeteer_launch first.');
    }

    const { selector, text } = args;
    await this.page.type(selector, text);

    return {
      content: [
        {
          type: 'text',
          text: `Typed "${text}" into element: ${selector}`,
        },
      ],
    };
  }

  private async handleEvaluate(args: any) {
    if (!this.page) {
      throw new Error('Browser not launched. Call puppeteer_launch first.');
    }

    const { script } = args;
    const result = await this.page.evaluate(script);

    return {
      content: [
        {
          type: 'text',
          text: `Script result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }

  private async handleClose() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }

    return {
      content: [
        {
          type: 'text',
          text: 'Browser closed successfully',
        },
      ],
    };
  }

  private async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new PuppeteerMCPServer();
server.run().catch(console.error);