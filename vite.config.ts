import { defineConfig, ViteDevServer, Connect, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ServerResponse } from "http";

type JsonResponse = Record<string, unknown>;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      {
        name: "api-plugin",
        configureServer(server: ViteDevServer) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith("/api/")) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const apiPath = url.pathname.substring(5);
              const modulePath = path.join(
                __dirname,
                "src",
                "api",
                `${apiPath}.ts`
              );

              try {
                const module = await server.ssrLoadModule(modulePath);
                const handler = module.default || module.handler;

                if (handler) {
                  const query = Object.fromEntries(url.searchParams.entries());
                  let body = {};

                  if (req.method === "POST") {
                    const bodyBuffer = [];
                    for await (const chunk of req) {
                      bodyBuffer.push(chunk);
                    }
                    body = JSON.parse(Buffer.concat(bodyBuffer).toString());
                  }

                  const mockReq = { ...req, query, body };
                  const mockRes = {
                    ...res,
                    statusCode: 200,
                    status(code: number) {
                      this.statusCode = code;
                      return this;
                    },
                    json(data: JsonResponse) {
                      res.setHeader("Content-Type", "application/json");
                      res.statusCode = this.statusCode;
                      res.end(JSON.stringify(data));
                    },
                  };

                  await handler(mockReq, mockRes);
                } else {
                  res.statusCode = 404;
                  res.end("API handler not found");
                }
              } catch (error) {
                console.error(`Error handling ${req.url}:`, error);
                res.statusCode = 500;
                res.end("Internal Server Error");
              }
            } else {
              next();
            }
          });
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
