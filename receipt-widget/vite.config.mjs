import { defineConfig, loadEnv } from "vite";

const env = loadEnv("", process.cwd());
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    {
      // Local development example of Backend API
      // This middleware is necessary for two reasons:
      // 1. The Ingrid API has CORS restrictions that prevent direct frontend calls
      // 2. Authentication requires a private key that should never be exposed in frontend code
      name: "backend-api",
      configureServer(server) {
        server.middlewares.use("/api/token", async (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          try {
            const url = new URL(
              "https://api.ingrid.com/v1/receipt_widget/token"
            );

            url.searchParams.append("site_id", env.VITE_SITE_ID);
            url.searchParams.append("session_id", env.VITE_SESSION_ID);

            const data = await fetch(url.toString(), {
              headers: {
                Authorization: `Bearer ${env.VITE_PRIVATE_KEY}`,
                "x-site-id": env.VITE_SITE_ID,
              },
            }).then((res) => res.json());
            res.end(JSON.stringify({ token: data.token }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      },
    },
  ],
});
