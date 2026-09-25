/**
 * Regenerates data/blur.ts — a 14px-wide WebP of every photograph, inlined as a
 * data URI so `next/image` can paint a blurred placeholder while the real file
 * loads. Below-the-fold photographs used to open onto an empty box.
 *
 *   node scripts/generate-blur.mjs
 *
 * Run it whenever a file is added to or replaced in /public/images.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name)) out.push(p);
  }
  return out;
}

const files = walk(ROOT).sort();
const rows = [];

for (const file of files) {
  const buf = await sharp(file)
    .resize(14, null, { fit: "inside" })
    .webp({ quality: 22, effort: 6 })
    .toBuffer();
  const publicPath = "/" + relative("public", file).split(sep).join("/");
  rows.push(`  "${publicPath}":\n    "data:image/webp;base64,${buf.toString("base64")}",`);
}

writeFileSync(
  "data/blur.ts",
  `/**
 * GENERATED — do not edit by hand. Run \`npm run blur\` after adding or
 * replacing anything in /public/images.
 *
 * A 14px WebP of each photograph, inlined so \`next/image\` can show a blurred
 * placeholder the moment the frame is laid out. The whole set is about 5KB of
 * source, and only the entries a page actually uses reach the browser.
 */

export const blurPlaceholders: Record<string, string> = {
${rows.join("\n")}
};

/** The placeholder for a public image path, or undefined if it has none. */
export function blurFor(src: string | null | undefined): string | undefined {
  return src ? blurPlaceholders[src] : undefined;
}
`,
);

console.log(`data/blur.ts — ${files.length} placeholders`);
