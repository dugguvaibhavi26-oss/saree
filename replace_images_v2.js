const fs = require('fs');
const path = require('path');

const dir = 'src';
const images = [
  '/images/demo-1.png', 
  '/images/demo-2.png', 
  '/images/demo-3.png', 
  '/images/demo-4.png',
  '/images/demo-5.png',
  '/images/demo-6.png',
  '/images/demo-7.png',
  '/images/demo-8.png',
  '/images/demo-9.png'
];

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace all existing demo image paths
      let updated = content.replace(/\/images\/demo-[1-9]\.png/g, () => {
        return images[Math.floor(Math.random() * images.length)];
      });

      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

walk(dir);
console.log('Done replacing images with the full 9-image suite.');
