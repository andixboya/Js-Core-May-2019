let Tag = require('./../models/TagSchema')
let Image = require('./../models/ImageSchema')
const fs = require('fs')

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile('./views/index.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      //add the tags
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      let dispalyTags = '';

      Tag.find({}).then(tags => {
        for (let tag of tags) {
          debugger
          dispalyTags += `<div class='tag' id="${tag._id}">${tag.name}</div>`;
        }

        //here we add the data to our file and we  then load the file to our end() method!
        data = data
          .toString()
          .replace(`<div class='replaceMe'></div>`, dispalyTags);
        
        res.end(data)
      })
    })
  } else {
    return true
  }
}
