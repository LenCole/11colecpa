const fs = require('fs');

module.exports = function (tabler) {
  const iconPath = `./node_modules/@tabler/icons/icons/${file}.svg`;

  try {
    // Read the SVG content from the file
    const svgContent = fs.readFileSync(iconPath, 'utf-8');
    return svgContent;
  } catch (error) {
    console.error(`Error reading SVG file: ${error}`);
    return '';
  }
};