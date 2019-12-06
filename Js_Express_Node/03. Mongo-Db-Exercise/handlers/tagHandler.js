const formidable = require('formidable');
const Tag = require('mongoose').model('Tag');
const http = require('http');
const util = require('util');





module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {

    // debugger;
    const form = new formidable.IncomingForm();

    //fields contains all the input names + their values
    //files contains all of the files + their names i think
    form.parse(req, function (err, fields, files) {
      if (err) {
        throw err;
      }
      res.writeHead(200, {
        'content-type': 'text-plain'
      });

      let name = fields.tagName;
      debugger

      //creation of tag , and then using it (with callback)
      Tag.create(
        {
          name,
          images: []

        }).then(tag => {
          //how to redirect with this 
          debugger
          res.writeHead(302, {
            location: '/'
          })

          //i guess... this was necessary? 
          res.end();
        })

    });

  } else {
    return true
  }
}

