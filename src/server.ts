import { existsSync } from "node:fs";
import { join, normalize, sep } from "node:path";
import { buildApp } from "../scripts/build.ts";
import { platforms } from "./data/platforms.ts";
import { sources } from "./data/sources.ts";

const ROOT = join(import.meta.dir, "..");
const DIST = join(ROOT, "dist");
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction || !existsSync(join(DIST, "index.html"))) {
  await buildApp();
}

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  "Cross-Origin-Opener-Policy": "same-origin"
};

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: {
      ...securityHeaders,
      "Cache-Control": "no-store"
    }
  });
}

function extension(pathname: string): string {
  const match = pathname.match(/\.[a-zA-Z0-9]+$/);
  return match?.[0]?.toLowerCase() ?? "";
}

function safeStaticPath(pathname: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  const candidate = normalize(join(DIST, relative));
  const expectedPrefix = DIST.endsWith(sep) ? DIST : `${DIST}${sep}`;

  if (candidate !== join(DIST, "index.html") && !candidate.startsWith(expectedPrefix)) {
    return null;
  }

  return candidate;
}

const server = Bun.serve({
  port: PORT,
  hostname: HOST,
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return json({ error: "method_not_allowed" }, 405);
    }

    if (url.pathname === "/health") {
      return json({
        status: "ok",
        runtime: `Bun ${Bun.version}`,
        reviewedAt: "2026-08-15"
      });
    }

    if (url.pathname === "/api/catalog") {
      return json({
        reviewedAt: "2026-08-15",
        platformCount: platforms.length,
        platforms,
        sources
      });
    }

    const filePath = safeStaticPath(url.pathname);
    if (!filePath) {
      return new Response("Bad request", {
        status: 400,
        headers: securityHeaders
      });
    }

    let responsePath = filePath;
    let file = Bun.file(responsePath);
    if (!(await file.exists())) {
      if (extension(url.pathname)) {
        return new Response("Not found", {
          status: 404,
          headers: securityHeaders
        });
      }
      responsePath = join(DIST, "index.html");
      file = Bun.file(responsePath);
    }

    const contentType =
      mimeTypes[extension(responsePath)] ??
      (responsePath.endsWith("index.html") ? mimeTypes[".html"] : "application/octet-stream");

    return new Response(request.method === "HEAD" ? null : file, {
      headers: {
        ...securityHeaders,
        "Content-Type": contentType,
        "Cache-Control": responsePath.endsWith("index.html")
          ? "no-cache"
          : "public, max-age=3600"
      }
    });
  },
  error(error) {
    console.error(error);
    return json({ error: "internal_server_error" }, 500);
  }
});

console.log(`Creator Revenue Router listening on http://${HOST}:${server.port}`);
