const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

// Tavily MCP Server
class TavilyMCP {
  constructor() {
    this.server = new Server(
      {
        name: 'tavily-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search',
          description: 'Search the web via Tavily API',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
            },
            required: ['query'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'search') {
        const apiKey = process.env.TAVILY_API_KEY;
        if (!apiKey) {
          return {
            content: [
              {
                type: 'text',
                text: 'Erro: TAVILY_API_KEY não encontrada',
              },
            ],
          };
        }
        const query = request.params.arguments?.query || '';
        try {
          const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              query: query,
            }),
          });
          const data = await response.json();
          return {
            content: [
              {
                type: 'text',
                text: data.answer ? `Response: ${data.answer}` : JSON.stringify(data.results || {}, null, 2),
              },
            ],
          };
        } catch (e) {
          return {
            content: [
              {
                type: 'text',
                text: `Erro Tavily: ${e.message}`,
              },
            ],
          };
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: `Tool desconhecida: ${request.params.name}`,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Tavily MCP server running on stdio');
  }
}

// Firecrawl MCP Server
class FirecrawlMCP {
  constructor() {
    this.server = new Server(
      {
        name: 'firecrawl-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'scrape',
          description: 'Scrape web page content via Firecrawl API',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string' },
            },
            required: ['url'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'scrape') {
        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) {
          return {
            content: [
              {
                type: 'text',
                text: 'Erro: FIRECRAWL_API_KEY não encontrada',
              },
            ],
          };
        }
        const url = request.params.arguments?.url || '';
        try {
          const response = await fetch(`https://api.firecrawl.dev/v1/scrape?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: url,
            }),
          });
          const data = await response.json();
          return {
            content: [
              {
                type: 'text',
                text: data.html || JSON.stringify(data, null, 2),
              },
            ],
          };
        } catch (e) {
          return {
            content: [
              {
                type: 'text',
                text: `Erro Firecrawl: ${e.message}`,
              },
            ],
          };
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: `Tool desconhecida: ${request.params.name}`,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Firecrawl MCP server running on stdio');
  }
}

// Strix MCP Server
class StrixMCP {
  constructor() {
    this.server = new Server(
      {
        name: 'strix-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'pentest',
          description: 'Executa pentest autônomo via Strix AI',
          inputSchema: {
            type: 'object',
            properties: {
              target: { type: 'string' },
              scope: { type: 'string' },
            },
            required: ['target'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'pentest') {
        const apiKey = process.env.STRIX_API_KEY;
        if (!apiKey) {
          return {
            content: [
              {
                type: 'text',
                text: 'Erro: STRIX_API_KEY não encontrada',
              },
            ],
          };
        }
        const target = request.params.arguments?.target || '';
        const scope = request.params.arguments?.scope || 'default';
        try {
          const response = await fetch('https://api.strix.ai/v1/pentest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              target: target,
              scope: scope,
            }),
          });
          const data = await response.json();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(data, null, 2),
              },
            ],
          };
        } catch (e) {
          return {
            content: [
              {
                type: 'text',
                text: `Erro Strix: ${e.message}`,
              },
            ],
          };
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: `Tool desconhecida: ${request.params.name}`,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Strix MCP server running on stdio');
  }
}

// Higgsfield MCP Server
class HiggsfieldMCP {
  constructor() {
    this.server = new Server(
      {
        name: 'higgsfield-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'generate_image',
          description: 'Gera imagem via Higgsfield AI',
          inputSchema: {
            type: 'object',
            properties: {
              prompt: { type: 'string' },
              style: { type: 'string' },
            },
            required: ['prompt'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'generate_image') {
        const apiKey = process.env.HIGGSFIELD_API_KEY;
        if (!apiKey) {
          return {
            content: [
              {
                type: 'text',
                text: 'Erro: HIGGSFIELD_API_KEY não encontrada',
              },
            ],
          };
        }
        const prompt = request.params.arguments?.prompt || '';
        const style = request.params.arguments?.style || 'default';
        try {
          const response = await fetch('https://api.higgsfield.ai/v1/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              prompt: prompt,
              style: style,
            }),
          });
          const data = await response.json();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(data, null, 2),
              },
            ],
          };
        } catch (e) {
          return {
            content: [
              {
                type: 'text',
                text: `Erro Higgsfield: ${e.message}`,
              },
            ],
          };
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: `Tool desconhecida: ${request.params.name}`,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Higgsfield MCP server running on stdio');
  }
}

// 21st.dev MCP Server
class TwentyFirstMCP {
  constructor() {
    this.server = new Server(
      {
        name: '21st-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_components',
          description: 'Busca componentes UI via 21st.dev',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              type: { type: 'string' },
            },
            required: ['query'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'search_components') {
        const apiKey = process.env.TWENTY_FIRST_API_KEY;
        if (!apiKey) {
          return {
            content: [
              {
                type: 'text',
                text: 'Erro: TWENTY_FIRST_API_KEY não encontrada',
              },
            ],
          };
        }
        const query = request.params.arguments?.query || '';
        const type = request.params.arguments?.type || 'all';
        try {
          const response = await fetch(`https://api.21st.dev/v1/search?query=${encodeURIComponent(query)}&type=${type}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
          });
          const data = await response.json();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(data, null, 2),
              },
            ],
          };
        } catch (e) {
          return {
            content: [
              {
                type: 'text',
                text: `Erro 21st.dev: ${e.message}`,
              },
            ],
          };
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: `Tool desconhecida: ${request.params.name}`,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('21st.dev MCP server running on stdio');
  }
}

// Context7 MCP Server
class Context7MCP {
  constructor() {
    this.server = new Server(
      {
        name: 'context7-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'query_docs',
          description: 'Consulta documentações de bibliotecas via Context7',
          inputSchema: {
            type: 'object',
            properties: {
              libraryId: { type: 'string' },
              query: { type: 'string' },
              language: { type: 'string' },
            },
            required: ['libraryId', 'query'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'query_docs') {
        const apiKey = process.env.CONTEXT7_API_KEY;
        if (!apiKey) {
          return {
            content: [
              {
                type: 'text',
                text: 'Erro: CONTEXT7_API_KEY não encontrada',
              },
            ],
          };
        }
        const libraryId = request.params.arguments?.libraryId || '';
        const query = request.params.arguments?.query || '';
        const language = request.params.arguments?.language || 'typescript';
        try {
          const response = await fetch('https://context7.com/v1/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              libraryId: libraryId,
              query: query,
              language: language,
            }),
          });
          const data = await response.json();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(data, null, 2),
              },
            ],
          };
        } catch (e) {
          return {
            content: [
              {
                type: 'text',
                text: `Erro Context7: ${e.message}`,
              },
            ],
          };
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: `Tool desconhecida: ${request.params.name}`,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Context7 MCP server running on stdio');
  }
}

// Run the selected server from command line
const serverName = process.argv[2];

switch (serverName) {
  case 'tavily':
    new TavilyMCP().run();
    break;
  case 'firecrawl':
    new FirecrawlMCP().run();
    break;
  case 'strix':
    new StrixMCP().run();
    break;
  case 'higgsfield':
    new HiggsfieldMCP().run();
    break;
  case '21st':
    new TwentyFirstMCP().run();
    break;
  case 'context7':
    new Context7MCP().run();
    break;
  case 'aisa':
    // AISA MCP Server - implementa servidor stub com tool `aisa_chat`
    class AisaMCP {
      constructor() {
        this.server = new Server(
          { name: 'aisa-mcp', version: '1.0.0' },
          { capabilities: { tools: {} } }
        );
        this.setupHandlers();
      }

      setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
          tools: [
            {
              name: 'aisa_chat',
              description: 'Chat com a API AISA (gateway LLM)',
              inputSchema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  model: { type: 'string' },
                },
                required: ['message'],
              },
            },
          ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
          if (request.params.name === 'aisa_chat') {
            const apiKey = process.env.AISA_API_KEY;
            if (!apiKey) {
              return {
                content: [
                  {
                    type: 'text',
                    text: 'Erro: AISA_API_KEY não encontrada no environment',
                  },
                ],
              };
            }
            const prompt = request.params.arguments?.message || '';
            const model = request.params.arguments?.model || 'aisa-llm';
            try {
              const response = await fetch('https://console.aisa.one/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                  model: model,
                  messages: [{ role: 'user', content: prompt }],
                }),
              });
              const data = await response.json();
              return {
                content: [
                  {
                    type: 'text',
                    text: data.choices?.[0]?.message?.content || 'Sem resposta',
                  },
                ],
              };
            } catch (e) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Erro na chamada AISA: ${e.message}`,
                  },
                ],
              };
            }
          }
          return {
            content: [
              {
                type: 'text',
                text: `Tool desconhecida: ${request.params.name}`,
              },
            ],
          };
        });
      }

      async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('AISA MCP server running on stdio');
      }
    }
    new AisaMCP().run();
    break;
  case 'graphify':
    // Graphify MCP Server - wrapper CLI para graphify
    class GraphifyMCP {
      constructor() {
        this.server = new Server(
          { name: 'graphify-mcp', version: '1.0.0' },
          { capabilities: { tools: {} } }
        );
        this.setupHandlers();
      }

      setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
          tools: [
            {
              name: 'graphify_query',
              description: 'Executa consultas no graphify (análise de dependências)',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  path: { type: 'string' },
                },
                required: ['query'],
              },
            },
          ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
          if (request.params.name === 'graphify_query') {
            const { execSync } = require('child_process');
            const query = request.params.arguments?.query || '';
            const dir = request.params.arguments?.path || process.cwd();
            try {
              const output = execSync(`graphify query "${query}" ${dir}`, {
                timeout: 30000,
                maxBuffer: 10 * 1024 * 1024,
              });
              return {
                content: [
                  {
                    type: 'text',
                    text: output.toString(),
                  },
                ],
              };
            } catch (e) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Erro graphify: ${e.message}`,
                  },
                ],
              };
            }
          }
          return {
            content: [
              {
                type: 'text',
                text: `Tool desconhecida: ${request.params.name}`,
              },
            ],
          };
        });
      }

      async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Graphify MCP server running on stdio');
      }
    }
    new GraphifyMCP().run();
    break;
  default:
    console.error('Usage: node mcp-servers.js <server-name>');
    console.error('Available servers: tavily, firecrawl, strix, higgsfield, 21st, context7, aisa, graphify');
    process.exit(1);
}
