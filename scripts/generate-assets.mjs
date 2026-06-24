// Generates all raster brand/SEO assets from source files using sharp.
//
//   node scripts/generate-assets.mjs
//
// Outputs to /public:
//   favicon.svg          branded monogram (scalable)
//   favicon-32.png       raster favicon fallback
//   apple-touch-icon.png 180x180 iOS home-screen icon
//   icon-192.png         PWA manifest icon
//   icon-512.png         PWA manifest icon (maskable-safe padding)
//   og.png               1200x630 social share card (with portrait)
//   portrait-512.jpg     square portrait for schema.org / social

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const pub = resolve(root, 'public');
const portraitSrc = resolve(root, 'src/assets/portrait.jpg');

// ---- Brand palette ---------------------------------------------------------
const INK = '#100d0a';
const CREAM = '#f6f1e6';
const ORANGE = '#e2622f';
const MUTED = '#a9a192';
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "'SF Mono', 'Courier New', monospace";

// ---- Monogram (favicon + app icons) ---------------------------------------
const monogram = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="${radius}" fill="${INK}"/>
  <text x="128" y="138" text-anchor="middle" dominant-baseline="central"
    font-family="${SERIF}" font-weight="700" font-size="168" fill="${ORANGE}">R</text>
</svg>`;

// Browser favicon: rounded, scalable.
writeFileSync(resolve(pub, 'favicon.svg'), monogram(256, 56));

// ---- OG card background ----------------------------------------------------
const ogBg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow1" cx="12%" cy="8%" r="70%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="92%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#785ac8" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#785ac8" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${CREAM}" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
    <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- portrait glow + ring (portrait composited on top by sharp) -->
  <circle cx="1000" cy="300" r="160" fill="${ORANGE}" fill-opacity="0.30" filter="url(#ring-glow)"/>
  <circle cx="1000" cy="300" r="153" fill="none" stroke="${ORANGE}" stroke-opacity="0.55" stroke-width="2"/>

  <!-- status label -->
  <circle cx="86" cy="92" r="5" fill="#3fbf6f"/>
  <text x="102" y="97" font-family="${MONO}" font-size="20" letter-spacing="3" fill="${ORANGE}">AVAILABLE FOR SELECT WORK</text>

  <!-- name -->
  <text x="80" y="248" font-family="${SERIF}" font-weight="600" font-size="94" fill="${CREAM}">Rajesh Pandey</text>

  <!-- role -->
  <text x="84" y="312" font-family="${MONO}" font-size="27" letter-spacing="1" fill="${ORANGE}">Lead Technical Engineer</text>

  <!-- tagline -->
  <text x="82" y="382" font-family="${SANS}" font-size="29" fill="${MUTED}">Cloud architecture, backend services, and the mobile</text>
  <text x="82" y="424" font-family="${SANS}" font-size="29" fill="${MUTED}">apps behind healthcare platforms.</text>

  <!-- footer / domain -->
  <line x1="82" y1="520" x2="660" y2="520" stroke="${CREAM}" stroke-opacity="0.12" stroke-width="1"/>
  <text x="82" y="560" font-family="${MONO}" font-size="22" letter-spacing="1" fill="#8a8275">rajeshpandey.site</text>
</svg>`;

async function run() {
	// App icons + favicon fallback (flatten onto ink so iOS/Android show no transparency).
	const icon = (size, radius) =>
		sharp(Buffer.from(monogram(size, radius))).png();

	await icon(32, 56).resize(32, 32).toFile(resolve(pub, 'favicon-32.png'));
	await icon(180, 40).resize(180, 180).flatten({ background: INK }).toFile(resolve(pub, 'apple-touch-icon.png'));
	await icon(192, 44).resize(192, 192).flatten({ background: INK }).toFile(resolve(pub, 'icon-192.png'));
	// Maskable: extra safe-zone padding so platform masks don't clip the glyph.
	await icon(512, 96).resize(512, 512).flatten({ background: INK }).toFile(resolve(pub, 'icon-512.png'));

	// Square portrait for schema.org / fallback social use (color, optimized).
	await sharp(portraitSrc)
		.rotate()
		.resize(512, 512, { fit: 'cover', position: 'centre' })
		.jpeg({ quality: 82, mozjpeg: true })
		.toFile(resolve(pub, 'portrait-512.jpg'));

	// Square portrait source imported by the home page <Image> so Astro can emit
	// crisp, non-distorted, retina-density avatars from a pre-cropped square.
	await sharp(portraitSrc)
		.rotate()
		.resize(600, 600, { fit: 'cover', position: 'centre' })
		.jpeg({ quality: 84, mozjpeg: true })
		.toFile(resolve(root, 'src/assets/portrait-square.jpg'));

	// Circular grayscale portrait to match the site's portrait treatment.
	const circleMask = Buffer.from(
		'<svg width="300" height="300"><circle cx="150" cy="150" r="150" fill="#fff"/></svg>',
	);
	const portraitCircle = await sharp(portraitSrc)
		.rotate()
		.resize(300, 300, { fit: 'cover', position: 'centre' })
		.grayscale()
		.modulate({ brightness: 1.04 })
		.composite([{ input: circleMask, blend: 'dest-in' }])
		.png()
		.toBuffer();

	// Compose the OG card: background SVG + portrait at the ring center (975,300).
	await sharp(Buffer.from(ogBg))
		.composite([{ input: portraitCircle, left: 1000 - 150, top: 300 - 150 }])
		.png()
		.toFile(resolve(pub, 'og.png'));

	console.log('✓ generated favicon.svg, favicon-32, apple-touch-icon, icon-192, icon-512, og.png, portrait-512.jpg');
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
