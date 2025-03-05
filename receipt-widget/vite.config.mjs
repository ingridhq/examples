import { defineConfig, loadEnv } from "vite";
import axios from "axios";

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
            const { data } = await axios.get(
              "https://api.ingrid.com/v1/receipt_widget/token",
              {
                params: {
                  site_id: env.VITE_SITE_ID,
                  session_id: env.VITE_SESSION_ID,
                },
                headers: {
                  Authorization: `Bearer ${env.VITE_PRIVATE_KEY}`,
                  "x-site-id": env.VITE_SITE_ID,
                },
              }
            );

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
