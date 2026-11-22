import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Load and resize the gold emblem
  const logoPath = path.join(process.cwd(), "public/brand/logo-mark.png");
  const logoBuffer = await sharp(logoPath)
    .resize(130, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const logoBase64 = logoBuffer.toString("base64");

  // SVG canvas with luxury aesthetic, clear typography, and a prominent CTA button
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#2D2214" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#14110C" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="#0A0907" stop-opacity="1"/>
        </radialGradient>

        <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FDF2CC"/>
          <stop offset="50%" stop-color="#DFBA5A"/>
          <stop offset="100%" stop-color="#B88E30"/>
        </linearGradient>

        <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F8E5A7"/>
          <stop offset="45%" stop-color="#DCB755"/>
          <stop offset="100%" stop-color="#B88A24"/>
        </linearGradient>

        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D4AF37" stop-opacity="0"/>
          <stop offset="50%" stop-color="#F5DB94" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
        </linearGradient>

        <filter id="ctaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGlow)"/>

      <!-- Outer Luxury Keyline Border -->
      <rect x="28" y="28" width="${width - 56}" height="${height - 56}" 
            fill="none" stroke="#D4AF37" stroke-width="1.2" stroke-opacity="0.32" rx="4"/>

      <!-- Inner Accent Border -->
      <rect x="36" y="36" width="${width - 72}" height="${height - 72}" 
            fill="none" stroke="#D4AF37" stroke-width="0.8" stroke-opacity="0.16" rx="2"/>

      <!-- Corner Accents -->
      <path d="M 46 66 L 46 46 L 66 46" fill="none" stroke="#F5DB94" stroke-width="2" stroke-opacity="0.7"/>
      <path d="M ${width - 66} 46 L ${width - 46} 46 L ${width - 46} 66" fill="none" stroke="#F5DB94" stroke-width="2" stroke-opacity="0.7"/>
      <path d="M 46 ${height - 66} L 46 ${height - 46} L 66 ${height - 46}" fill="none" stroke="#F5DB94" stroke-width="2" stroke-opacity="0.7"/>
      <path d="M ${width - 66} ${height - 46} L ${width - 46} ${height - 46} L ${width - 46} ${height - 66}" fill="none" stroke="#F5DB94" stroke-width="2" stroke-opacity="0.7"/>

      <!-- Centered 3D Gold Logo Mark -->
      <image href="data:image/png;base64,${logoBase64}" x="535" y="62" width="130" height="96"/>

      <!-- Brand Heading -->
      <text x="600" y="200" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" 
            font-size="44" font-weight="700" letter-spacing="4" fill="url(#goldText)">
        GOLDEN ACRES REAL ESTATES
      </text>

      <!-- Subtitle -->
      <text x="600" y="238" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" 
            font-size="15" font-weight="600" letter-spacing="6" fill="#D6C088">
        PREMIER PROPERTY CONSULTANTS · TRIVANDRUM, KERALA
      </text>

      <!-- Divider -->
      <line x1="420" y1="266" x2="780" y2="266" stroke="url(#lineGrad)" stroke-width="1.5"/>

      <!-- Value Proposition / Categories -->
      <text x="600" y="318" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" 
            font-size="21" font-weight="400" letter-spacing="1.5" fill="#E8DEC8">
        Residential Plots  ·  Luxury Villas  ·  Flats &amp; Apartments  ·  Commercial
      </text>

      <text x="600" y="354" text-anchor="middle" font-family="Georgia, serif" font-style="italic" 
            font-size="18" fill="#B3A282">
        Where your address becomes a legacy
      </text>

      <!-- CALL TO ACTION (Conversion Text Pill Button) -->
      <g filter="url(#ctaShadow)">
        <rect x="410" y="420" width="380" height="56" rx="28" 
              fill="url(#ctaGrad)" stroke="#FFF4CC" stroke-width="1.5"/>
        <text x="600" y="455" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" 
              font-size="17" font-weight="800" letter-spacing="2.5" fill="#14110A">
          EXPLORE PROPERTIES &amp; ENQUIRE  →
        </text>
      </g>

      <!-- Domain Verification Link -->
      <text x="600" y="522" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" 
            font-size="14" font-weight="500" letter-spacing="2" fill="#8E826F">
        goldenacresrealestate.co.in
      </text>
    </svg>
  `;

  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const publicOgPath = path.join(process.cwd(), "public/og-image.png");
  const publicAltOgPath = path.join(process.cwd(), "public/og/golden-acres-og.png");
  const brainArtifactPath = "/Users/abi-mac/.gemini/antigravity/brain/cac76940-e9bf-4647-8a17-16b5cb5e3c84/current-og-image.png";

  fs.writeFileSync(publicOgPath, pngBuffer);
  if (fs.existsSync(path.dirname(publicAltOgPath))) {
    fs.writeFileSync(publicAltOgPath, pngBuffer);
  }
  fs.writeFileSync(brainArtifactPath, pngBuffer);

  console.log(`Generated luxury OG card with conversion CTA button at ${publicOgPath} (${pngBuffer.length} bytes)`);
}

generateOgImage().catch((err) => {
  console.error("Failed to generate OG image:", err);
  process.exit(1);
});
