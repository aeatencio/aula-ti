import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pngPath = join(root, "public/og.png");
const distHomePath = join(root, "dist/index.html");
const distImagePath = join(root, "dist/og.png");
const layoutPath = join(root, "src/layouts/Layout.astro");

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const SITE = "https://aula.andresatencio.com";
const HOME_SOCIAL_TITLE = "Materiales para enseñar y trabajar en clase";
const HOME_DESCRIPTION =
  "Materiales para proyectar, consultar y recuperar después de clase.";
const SOCIAL_IMAGE = `${SITE}/og.png`;
const SOCIAL_ALT = "La palabra Aula sobre un pizarrón de clase";

function requireDist() {
  assert.ok(
    existsSync(distHomePath),
    "Falta dist/. Ejecutá npm run build antes de npm test.",
  );
}

function readPng(path) {
  const buf = readFileSync(path);
  assert.deepEqual(
    [...buf.subarray(0, 8)],
    PNG_SIGNATURE,
    `${path} debe ser un PNG`,
  );
  assert.equal(buf.toString("ascii", 12, 16), "IHDR", `${path} debe tener IHDR`);
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

function metaContent(html, attr, value) {
  const tag = html.match(
    new RegExp(`<meta\\s+[^>]*\\b${attr}="${value}"[^>]*>`, "i"),
  )?.[0];
  assert.ok(tag, `Falta <meta ${attr}="${value}">`);
  const content = tag.match(/\bcontent="([^"]*)"/i)?.[1];
  assert.ok(content !== undefined, `${attr}="${value}" no tiene content`);
  return content;
}

function documentTitle(html) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  assert.ok(title, "Falta <title>");
  return title;
}

describe("identidad social", () => {
  it("public/og.png es un PNG 1200×630", () => {
    const { width, height } = readPng(pngPath);
    assert.equal(width, 1200);
    assert.equal(height, 630);
  });

  it("el HTML construido de la Home declara la metadata social", () => {
    requireDist();
    const html = readFileSync(distHomePath, "utf8");

    assert.equal(documentTitle(html), "Aula");
    assert.equal(metaContent(html, "property", "og:title"), HOME_SOCIAL_TITLE);
    assert.equal(
      metaContent(html, "property", "og:description"),
      HOME_DESCRIPTION,
    );
    assert.equal(metaContent(html, "property", "og:image"), SOCIAL_IMAGE);
    assert.equal(metaContent(html, "property", "og:image:width"), "1200");
    assert.equal(metaContent(html, "property", "og:image:height"), "630");
    assert.equal(metaContent(html, "property", "og:image:alt"), SOCIAL_ALT);
    assert.equal(metaContent(html, "property", "og:site_name"), "Aula");
    assert.equal(
      metaContent(html, "name", "twitter:card"),
      "summary_large_image",
    );
    assert.equal(metaContent(html, "name", "twitter:title"), HOME_SOCIAL_TITLE);
    assert.equal(
      metaContent(html, "name", "twitter:description"),
      HOME_DESCRIPTION,
    );
    assert.equal(metaContent(html, "name", "twitter:image"), SOCIAL_IMAGE);

    assert.notEqual(metaContent(html, "property", "og:title"), "Aula");
    assert.doesNotMatch(
      metaContent(html, "property", "og:title"),
      /Tecnolog[ií]as de la Informaci[oó]n/,
    );
    assert.doesNotMatch(
      metaContent(html, "property", "og:description"),
      /Tecnolog[ií]as de la Informaci[oó]n/,
    );
    assert.notEqual(metaContent(html, "property", "og:image:alt"), "Aula");
    assert.match(metaContent(html, "property", "og:image:alt"), /Aula/);
    assert.match(metaContent(html, "property", "og:image:alt"), /pizarrón/i);
    assert.match(metaContent(html, "property", "og:image"), /^https:\/\//);
  });

  it("el build copia og.png a dist/ con las mismas dimensiones", () => {
    requireDist();
    assert.ok(existsSync(distImagePath), "Falta dist/og.png");
    const source = readPng(pngPath);
    const built = readPng(distImagePath);
    assert.deepEqual(built, source);
  });

  it("la descripción por defecto del layout no define Aula sólo como TI", () => {
    const layout = readFileSync(layoutPath, "utf8");
    const defaultDescription = layout.match(/description = "([^"]+)"/)?.[1];
    assert.ok(defaultDescription);
    assert.doesNotMatch(
      defaultDescription,
      /Tecnolog[ií]as de la Informaci[oó]n/,
    );
    assert.match(
      defaultDescription,
      /Materiales para enseñar y trabajar en clase/,
    );
  });
});
