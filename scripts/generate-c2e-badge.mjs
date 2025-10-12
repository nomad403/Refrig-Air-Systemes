#!/usr/bin/env node
import fs from "fs";
import path from "path";
import sharp from "sharp";

const outDir = path.resolve(process.cwd(), "public", "images", "certifications");
const outPath = path.join(outDir, "c2e.png");

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  // Render a simple SVG badge in-memory and rasterize to PNG via sharp
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#5a84f1" />
        <stop offset="100%" stop-color="#2b5be7" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="256" height="256" rx="28" fill="url(#g)"/>
    <g fill="#ffffff" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle">
      <text x="128" y="138" font-size="96">C2E</text>
    </g>
  </svg>`;

  const buffer = Buffer.from(svg);
  await sharp(buffer).png({ compressionLevel: 9 }).toFile(outPath);
  console.log(`Generated: ${path.relative(process.cwd(), outPath)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


