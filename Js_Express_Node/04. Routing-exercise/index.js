//process is a key word , given from nodeJs

const env = process.env.NODE_ENV || 'development';

//handed as dictionary it seems or... array
const config = require('./config/config')[env];


require('./config/database')(config);


const app = require('express')();
//configurations related to routes(mvc) +  and others (middlewares ,etc)
require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}...`));