const fs = require('fs');
const path = require('path');

const dir = 'src';
const images = ['/images/demo-1.png', '/images/demo-2.png', '/images/demo-3.png', '/images/demo-4.png'];

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace all unsplash images
      let updated = content.replace(/https:\/\/images\.unsplash\.com\/[^\s\"\'\`]+/g, () => {
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
console.log('Done replacing images.');
