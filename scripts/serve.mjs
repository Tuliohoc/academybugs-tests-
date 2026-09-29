/* The static server the lab page and its tests run against.
 *
 * Same reasoning as the portfolio's server: python is not portable on Windows
 * and keeps a queue the suite overruns, while Node can serve this in a few
 * lines with no dependency. The root defaults to the repository and can be
 * pointed at `site` — the folder GitHub Pages publishes — so a local preview
 * behaves like the published address, index.html included.
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const base = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.argv[2] || process.env.PORT || 8000);
const root = resolve(base, process.argv[3] || ".");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".zip": "application/zip",
};

/** Resolve a request path to a file inside the served folder, or null. */
async function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  // normalize collapses any ".." before it can climb out of the folder
  const target = normalize(join(root, decoded));
  if (!target.startsWith(root.endsWith(sep) ? root : root + sep) && target !== root) return null;

  try {
    const found = await stat(target);
    if (found.isDirectory()) return resolveFile(pathname.replace(/\/?$/, "/") + "index.html");
    return target;
  } catch {
    return null;
  }
}

function send(response, status, file) {
  response.writeHead(status, {
    "content-type": TYPES[extname(file).toLowerCase()] || "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(file).pipe(response);
}

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");
  const file = await resolveFile(pathname);

  if (file) {
    send(response, 200, file);
    return;
  }

  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Serving ${root} on http://127.0.0.1:${port}\n`);
});
