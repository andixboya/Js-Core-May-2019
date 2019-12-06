const Image = require('../models/ImageSchema');
const formidable = require('formidable');
const http = require('http');
const util = require('util');


module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}


function addImage(req, res) {

  debugger;
  //guess we`ll create the form class, which will contain the info
  

}

function deleteImg(req, res) {
  debugger
  let x = 5;
}
