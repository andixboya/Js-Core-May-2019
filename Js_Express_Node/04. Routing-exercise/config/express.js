const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = app => {
    //you have to add your default layout! 
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //for the view engine (what the )
    app.set('view engine', '.hbs');

    //middle for files (shows the dir of the files)
    app.use(express.static('./static'));
};