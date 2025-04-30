const fs = require('fs');
const path = require('path');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to save base64 image to file
function saveBase64Image(base64String, filename) {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
}

// Save each image
const images = [
  { name: 'medieval-battle.png', data: /* base64 data */ },
  { name: 'cyberpunk-city.png', data: /* base64 data */ },
  { name: 'magic-battle.png', data: /* base64 data */ },
  { name: 'medieval-blacksmith.png', data: /* base64 data */ },
  { name: 'steampunk-city.png', data: /* base64 data */ },
  { name: 'dwarf-door.png', data: /* base64 data */ },
  { name: 'cyberpunk-noir.png', data: /* base64 data */ },
  { name: 'medieval-battle-2.png', data: /* base64 data */ },
  { name: 'medieval-landscape.png', data: /* base64 data */ },
  { name: 'LowFantasy.png', data: /* base64 data */ }
];

images.forEach(img => {
  if (img.data) {
    saveBase64Image(img.data, img.name);
    console.log(`Saved ${img.name}`);
  }
}); 