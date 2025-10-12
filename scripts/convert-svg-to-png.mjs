#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const DEFAULT_DPI = parseInt(process.env.SVG_PNG_DPI || "192", 10); // 2x density
const DEFAULT_BG = process.env.SVG_PNG_BG || null; // e.g. "#ffffff" to fill background

/**
 * Recursively walk a directory and return absolute file paths.
 */
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
  return files;
}

/**
 * Convert one SVG file to PNG next to it.
 */
async function convertSvg(svgPath) {
  const outPath = svgPath.replace(/\.svg$/i, ".png");
  try {
    const input = fs.readFileSync(svgPath);
    let pipeline = sharp(input, { density: DEFAULT_DPI });
    if (DEFAULT_BG) {
      pipeline = pipeline.flatten({ background: DEFAULT_BG });
    }
    const pngBuffer = await pipeline.png({ compressionLevel: 9 }).toBuffer();
    fs.writeFileSync(outPath, pngBuffer);
    return { ok: true, svgPath, outPath };
  } catch (error) {
    return { ok: false, svgPath, error };
  }
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`Public directory not found: ${PUBLIC_DIR}`);
    process.exit(1);
  }
  const allFiles = walk(PUBLIC_DIR);
  const svgs = allFiles.filter(f => /\.svg$/i.test(f));
  if (svgs.length === 0) {
    console.log("No SVG files found under public/.");
    return;
  }
  console.log(`Found ${svgs.length} SVG file(s). Converting to PNG...`);
  let ok = 0, fail = 0;
  const results = await Promise.all(svgs.map(convertSvg));
  for (const r of results) {
    if (r.ok) {
      ok++;
      console.log(`OK  ${path.relative(PUBLIC_DIR, r.svgPath)} -> ${path.relative(PUBLIC_DIR, r.outPath)}`);
    } else {
      fail++;
      console.warn(`ERR ${path.relative(PUBLIC_DIR, r.svgPath)}: ${r.error?.message || r.error}`);
    }
  }
  console.log(`Done. Success: ${ok}, Failed: ${fail}`);
  if (fail > 0) process.exitCode = 2;
}

main();


