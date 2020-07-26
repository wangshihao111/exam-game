var fs = require('fs');
var path = require('path');

var from = path.resolve(__dirname, 'bgmusic.mp3');
var to = path.resolve(__dirname, 'dist/bgmusic.mp3')

fs.copyFile(from, to, () => {
  console.log('copy mp3 successfully');
})