import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import { cpSync, existsSync } from "fs";
import { resolve } from "path";

// server deps to bundle to reduce openat(2) syscalls
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  // 1️⃣ Clean dist FIRST
  await rm("dist", { recursive: true, force: true });

  // 2️⃣ Build client (creates dist/)
  console.log("building client...");
  await viteBuild();

  // 3️⃣ Build server
  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  // 4️⃣ NOW copy public → dist
  const publicDir = resolve("public");
  const distDir = resolve("dist");

  if (existsSync(publicDir)) {
    cpSync(publicDir, distDir, { recursive: true });
    console.log("✔ Copied public files to dist");
  }
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});