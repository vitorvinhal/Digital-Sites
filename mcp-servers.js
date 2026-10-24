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
          description:
            'Inicia um pentest autônomo (Strix) contra um domínio. O domínio é cadastrado/verificado automaticamente se ainda não existir. Retorna scan_id para acompanhar.',
          inputSchema: {
            type: 'object',
            properties: {
              target: { type: 'string', description: 'URL ou domínio, ex.: https://exemplo.com' },
              focus: { type: 'string', description: 'Áreas a testar primeiro, ex.: "checkout flow"' },
              concerns: { type: 'string', description: 'Preocupações de segurança, ex.: "IDOR na API de invoices"' },
              title: { type: 'string', description: 'Título do scan (máx 120)' },
              tier: { type: 'string', enum: ['lite', 'standard', 'ultra'], description: 'Profundidade/custo (padrão lite = 0.3x)' },
            },
            required: ['target'],
          },
        },
        {
          name: 'scan_status',
          description: 'Status, resumo executivo e vulnerabilidades de um scan Strix pelo scan_id',
          inputSchema: {
            type: 'object',
            properties: { scan_id: { type: 'string' } },
            required: ['scan_id'],
          },
        },
        {
          name: 'list_scans',
          description: 'Lista os últimos 20 scans da organização (sem efeito colateral)',
          inputSchema: { type: 'object', properties: {} },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const args = request.params.arguments || {};
      const token = process.env.STRIX_API_KEY;
      const asText = (t) => ({ content: [{ type: 'text', text: t }] });
      const asJson = (o) => asText(JSON.stringify(o, null, 2));
      if (!token || token.startsWith('YOUR_')) {
        return asText('Erro: STRIX_API_KEY ausente/placeholder (esperado em ~/.config/opencode/secrets/strix.key)');
      }
      // Base real: https://app.strix.ai/api/v1 (docs.app.strix.ai) — Bearer token
      const base = String(process.env.STRIX_BASE_URL || 'https://app.strix.ai/api/v1').replace(/\/+$/, '');
      const api = async (path, opts = {}) => {
        const res = await fetch(`${base}${path}`, {
          method: opts.method || 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
          },
          body: opts.body ? JSON.stringify(opts.body) : undefined,
        });
        const raw = await res.text();
        let data;
        try {
          data = raw ? JSON.parse(raw) : null;
        } catch (e) {
          data = { raw: raw.slice(0, 400) };
        }
        return { status: res.status, ok: res.ok, data };
      };
      try {
        if (request.params.name === 'list_scans') {
          const r = await api('/scans?limit=20');
          if (!r.ok) return asJson(r.data);
          return asJson({
            scans: (r.data.items || []).map((s) => ({
              id: s.id,
              title: s.title,
              status: s.status,
              findings: s.findings,
              created_at: s.created_at,
              scans_this_month: r.data.scansThisMonth,
            })),
          });
        }
        if (request.params.name === 'scan_status') {
          if (!args.scan_id) return asText('Erro: informe scan_id');
          const r = await api(`/scans/${encodeURIComponent(args.scan_id)}`);
          if (!r.ok) return asJson(r.data);
          const d = r.data;
          return asJson({
            scan_id: d.id,
            title: d.title,
            status: d.status,
            scan_tier: d.scan_tier,
            created_at: d.created_at,
            completed_at: d.completed_at,
            duration: d.duration,
            findings: d.findings,
            executive_summary: d.executive_summary,
            recommendations: d.recommendations,
            vulnerabilities: (d.vulnerabilities || []).map((v) => ({
              id: v.id,
              severity: v.severity,
              status: v.status,
              title: v.title,
              endpoint: v.endpoint,
              method: v.method,
              cvss: v.cvss,
            })),
          });
        }
        if (request.params.name === 'pentest') {
          const raw = (args.target || '').trim();
          if (!raw) return asText('Erro: informe target (ex.: https://exemplo.com)');
          let host;
          try {
            host = new URL(raw.includes('://') ? raw : `https://${raw}`).hostname;
          } catch (e) {
            host = raw;
          }
          const tier = ['lite', 'standard', 'ultra'].includes(args.tier) ? args.tier : 'lite';

          // 1) domínio já cadastrado?
          const list = await api(`/domains?limit=100&search=${encodeURIComponent(host)}`);
          if (!list.ok) return asText(`Erro ao listar domínios (HTTP ${list.status}): ${JSON.stringify(list.data)}`);
          let domain = (list.data.items || []).find((d) => String(d.domain || '').toLowerCase() === host.toLowerCase());

          // 2) cadastra se não existir (CreateDomainRequest: domain + asset_type)
          if (!domain) {
            const created = await api('/domains', {
              method: 'POST',
              body: { domain: host, asset_type: 'domain' },
            });
            if (!created.ok) return asText(`Erro ao cadastrar ${host} (HTTP ${created.status}): ${JSON.stringify(created.data)}`);
            domain = created.data;
          }

          // 3) prova de posse — só o dono passa aqui
          if (!domain.verified) {
            const v = await api(`/domains/${domain.id}/verify`, { method: 'POST', body: {} });
            if (v.data && v.data.id) domain = v.data;
          }
          if (!domain.verified) {
            return asText(
              `Domínio ${host} cadastrado (id ${domain.id}) mas NÃO VERIFICADO — o Strix exige provar posse antes de escanear.\n` +
                `Opções:\n` +
                `1) Publique o registro indicado no dashboard Strix (DNS TXT / arquivo /.well-known / meta tag) e repita o chamado;\n` +
                `2) Use um domínio já verificado na organização (veja list_scans ou o dashboard).`
            );
          }

          // 4) dispara o scan (CreateScanRequest exige alvo por id)
          const created = await api('/scans', {
            method: 'POST',
            body: {
              domain_ids: [domain.id],
              scan_tier: tier,
              title: String(args.title || `Pentest de ${host}`).slice(0, 120),
              ...(args.focus ? { focus: String(args.focus) } : {}),
              ...(args.concerns ? { concerns: String(args.concerns) } : {}),
            },
          });
          if (!created.ok) return asText(`Erro ao criar scan (HTTP ${created.status}): ${JSON.stringify(created.data)}`);
          return asJson({
            scan_id: created.data.scan_id,
            title: created.data.title,
            status: created.data.status,
            tier,
            target: host,
            next: `Acompanhe com scan_status(scan_id="${created.data.scan_id}")`,
          });
        }
        return asText(`Tool desconhecida: ${request.params.name}`);
      } catch (e) {
        return asText(`Erro Strix: ${e.message}`);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Strix MCP server running on stdio');
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
            const model = request.params.arguments?.model || 'qwen3.7-flash';
            try {
              const response = await fetch('https://api.aisa.one/v1/chat/completions', {
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
              const raw = await response.text();
              let data;
              try {
                data = JSON.parse(raw);
              } catch {
                return {
                  content: [
                    {
                      type: 'text',
                      text: `AISA devolveu HTTP ${response.status} com resposta não-JSON (proxy/portal?). Trecho: ${raw.slice(0, 200)}`,
                    },
                  ],
                };
              }
              if (!response.ok || data.error) {
                const msg = typeof data.error === 'string' ? data.error : (data.error?.message || JSON.stringify(data.error));
                return {
                  content: [
                    {
                      type: 'text',
                      text: `AISA HTTP ${response.status}: ${msg}`,
                    },
                  ],
                };
              }
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
    console.error('Available servers: tavily, firecrawl, strix, 21st, context7, aisa, graphify');
    process.exit(1);
}
