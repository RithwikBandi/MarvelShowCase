import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const heroes = [
  {
    name: 'iron-man',
    url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/002irm_ons_crd_03.jpg'
  },
  {
    name: 'captain-america',
    url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/003cap_ons_crd_03.jpg'
  },
  {
    name: 'thor',
    url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/004tho_ons_crd_03.jpg'
  },
  {
    name: 'hulk',
    url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/006hbb_ons_crd_03.jpg'
  },
  {
    name: 'black-widow',
    url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/011blw_ons_crd_04.jpg'
  },
  {
    name: 'hawkeye',
    url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/hawkeye_ons_crd_01.jpg'
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(`Failed to download image: ${response.statusCode}`);
      }
    }).on('error', reject);
  });
};

const optimizeImage = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    // Convert to WebP with high quality and optimization
    exec(
      `npx sharp "${inputPath}" --format webp --quality 90 --output "${outputPath}"`,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const heroesDir = path.join(projectRoot, 'public', 'images', 'heroes');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(heroesDir)) {
    fs.mkdirSync(heroesDir, { recursive: true });
  }

  for (const hero of heroes) {
    const tempPath = path.join(heroesDir, `${hero.name}-temp.jpg`);
    const finalPath = path.join(heroesDir, `${hero.name}.webp`);

    try {
      console.log(`Downloading ${hero.name}...`);
      await downloadImage(hero.url, tempPath);
      
      console.log(`Optimizing ${hero.name}...`);
      await optimizeImage(tempPath, finalPath);
      
      // Clean up temp file
      fs.unlinkSync(tempPath);
      
      console.log(`✅ Completed ${hero.name}`);
    } catch (error) {
      console.error(`❌ Error processing ${hero.name}:`, error);
    }
  }
}

main().catch(console.error); 