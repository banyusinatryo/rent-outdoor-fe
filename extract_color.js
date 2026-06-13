const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/images/nexus logo.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    const colorCounts = {};
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        let a = this.data[idx + 3];

        if (a > 50) { 
          // group similar colors (quantize by dividing by 16)
          let rq = Math.round(r/16)*16;
          let gq = Math.round(g/16)*16;
          let bq = Math.round(b/16)*16;
          const hex = "#" + ((1 << 24) + (rq << 16) + (gq << 8) + bq).toString(16).slice(1);
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
      }
    }

    const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    console.log("Top colors:");
    sortedColors.slice(0, 5).forEach(c => console.log(c[0], c[1]));
  });
