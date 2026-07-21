import sharp from 'sharp';
import { resolve } from 'path';
import { existsSync } from 'fs';

const inputPath = resolve('logo.png');
const outputDir = resolve('public');

if (!existsSync(inputPath)) {
  console.error('Source image not found at:', inputPath);
  console.log('Please add your logo as: logo.png');
  process.exit(1);
}

async function generateIcons() {
  const createIcon = async (size, fileName) => {
    await sharp(inputPath)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png()
      .toFile(resolve(outputDir, fileName));
  };

  try {
    await createIcon(192, 'pwa-192x192.png');
    await createIcon(512, 'pwa-512x512.png');
    await createIcon(512, 'pwa-maskable-512x512.png');
    await sharp(resolve(outputDir, 'pwa-192x192.png')).resize(32, 32).toFile(resolve(outputDir, 'favicon.ico'));
    console.log('Generated direct-source PWA and favicon variants.');
  } catch (error) {
    console.error('Icon generation failed:', error.message);
    process.exit(1);
  }
}

generateIcons();
