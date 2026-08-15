import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const DIST = join(ROOT, "dist");

export async function buildApp(): Promise<void> {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(join(DIST, "assets"), { recursive: true });

  const result = await Bun.build({
    entrypoints: [join(ROOT, "src/client.ts")],
    outdir: join(DIST, "assets"),
    target: "browser",
    format: "esm",
    minify: process.env.NODE_ENV === "production",
    sourcemap: process.env.NODE_ENV === "production" ? "none" : "external",
    naming: { entry: "client.js" }
  });

  if (!result.success) {
    for (const log of result.logs) console.error(log);
    throw new Error("Client build failed");
  }

  await Promise.all([
    copyFile(join(ROOT, "public/index.html"), join(DIST, "index.html")),
    copyFile(join(ROOT, "src/styles.css"), join(DIST, "assets/styles.css")),
    copyFile(join(ROOT, "src/styles-components.css"), join(DIST, "assets/styles-components.css")),
    copyFile(join(ROOT, "src/styles-responsive.css"), join(DIST, "assets/styles-responsive.css")),
    writeFile(
      join(DIST, "build.json"),
      JSON.stringify(
        {
          builtAt: new Date().toISOString(),
          runtime: `Bun ${Bun.version}`,
          entrypoint: "src/client.ts"
        },
        null,
        2
      )
    )
  ]);
}

if (import.meta.main) {
  await buildApp();
  console.log("Built dist/");
}
