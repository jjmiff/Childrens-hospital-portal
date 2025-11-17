#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *
 * Reads originals from src/assets/source-images and outputs responsive
 * AVIF + WebP (and JPG/PNG fallback when needed) into public/images,
 * plus a manifest at src/assets/images/manifest.json used by ResponsiveImage.
 */

import fs from "fs/promises";
import path from "path";
import url from "url";
import sharp from "sharp";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const SRC_DIR = path.join(projectRoot, "src", "assets", "source-images");
const OUT_DIR = path.join(projectRoot, "public", "images");
const MANIFEST = path.join(
  projectRoot,
  "src",
  "assets",
  "images",
  "manifest.json"
);

const sizes = [320, 480, 640, 768, 960, 1200, 1536, 1920];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function baseNameNoExt(filename) {
  const ext = path.extname(filename);
  return path.basename(filename, ext);
}

function extLower(filename) {
  return path.extname(filename).toLowerCase();
}

async function getImagesList() {
  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .filter((e) => /(\.jpe?g|\.png|\.webp|\.avif|\.gif|\.svg)$/i.test(e.name))
    .map((e) => e.name);
}

async function processImage(file) {
  const srcPath = path.join(SRC_DIR, file);
  const name = baseNameNoExt(file);
  const ext = extLower(file);

  const image = sharp(srcPath, { limitInputPixels: false });
  const meta = await image.metadata();

  const variants = [];
  const outBase = path.join(OUT_DIR, name);
  await ensureDir(OUT_DIR);

  // Decide if we need a raster fallback (for PNG/JPG) if original is vector (SVG)
  const needsRasterFallback =
    ext === ".png" || ext === ".jpg" || ext === ".jpeg";

  // For each target width, produce AVIF and WebP
  for (const width of sizes) {
    if (meta.width && width > meta.width) continue; // don't upscale

    const avifName = `${name}-${width}.avif`;
    const webpName = `${name}-${width}.webp`;
    const avifOut = path.join(OUT_DIR, avifName);
    const webpOut = path.join(OUT_DIR, webpName);

    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 55, effort: 4 })
      .toFile(avifOut);

    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(webpOut);

    variants.push({
      width,
      avif: `/images/${avifName}`,
      webp: `/images/${webpName}`,
    });
  }

  // Add a largest single fallback (jpg or png) for legacy
  let fallback = null;
  if (needsRasterFallback) {
    const maxWidth = Math.min(meta.width || 1920, 1920);
    const fallbackName = `${name}-${maxWidth}.jpg`;
    const fallbackOut = path.join(OUT_DIR, fallbackName);
    await sharp(srcPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: 72 })
      .toFile(fallbackOut);
    fallback = `/images/${fallbackName}`;
  }

  return { name, width: meta.width, height: meta.height, variants, fallback };
}

async function writeManifest(items) {
  const manifestObj = {};
  for (const item of items) {
    manifestObj[item.name] = item;
  }
  await ensureDir(path.dirname(MANIFEST));
  await fs.writeFile(MANIFEST, JSON.stringify(manifestObj, null, 2));
}

async function main() {
  console.log("Optimizing images...");
  await ensureDir(SRC_DIR);
  await ensureDir(OUT_DIR);
  const files = await getImagesList();
  if (!files.length) {
    console.log(
      `No source images found in ${path.relative(projectRoot, SRC_DIR)}.`
    );
    console.log("Place originals there (JPG/PNG/WebP/AVIF/SVG) and re-run.");
    await writeManifest([]);
    return;
  }
  const results = [];
  for (const f of files) {
    try {
      const info = await processImage(f);
      results.push(info);
      console.log(`✓ ${f}`);
    } catch (e) {
      console.error(`✗ Failed ${f}:`, e.message);
    }
  }
  await writeManifest(results);
  console.log(
    `Done. Wrote ${results.length} entries to ${path.relative(
      projectRoot,
      MANIFEST
    )}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
