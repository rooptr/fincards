import sharp from 'sharp';
import { resolve } from 'path';
import { existsSync } from 'fs';

const inputPath = resolve('public/logo-source.png');
const outputDir = resolve('public');

if (!existsSync(inputPath)) {
  console.error('❌ Source image not found at:', inputPath);
  console.log('Please copy your logo as: public/logo-source.png');
  process.exit(1);
}

async function generateIcons() {
  try {
    console.log('📦 Generating PWA icons from:', inputPath);
    
    // 192x192
    await sharp(inputPath)
      .resize(192, 192, { fit: 'cover', position: 'center' })
      .png()
      .toFile(resolve(outputDir, 'pwa-192x192.png'));
    console.log('✅ Generated: public/pwa-192x192.png (192x192)');

    // 512x512
    await sharp(inputPath)
      .resize(512, 512, { fit: 'cover', position: 'center' })
      .png()
      .toFile(resolve(outputDir, 'pwa-512x512.png'));
    console.log('✅ Generated: public/pwa-512x512.png (512x512)');

    // Optional: favicon.ico (32x32)
    await sharp(inputPath)
      .resize(32, 32, { fit: 'cover', position: 'center' })
      .toFile(resolve(outputDir, 'favicon.ico'));
    console.log('✅ Generated: public/favicon.ico (32x32)');

    console.log('\n🎉 Done! Run `npm run build` to update manifest.');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

generateIcons();