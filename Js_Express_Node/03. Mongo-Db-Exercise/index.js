const http = require('http')
const url = require('url')
const qs = require('querystring')
const port = process.env.PORT || 5000
const handlers = require('./handlers/handlerBlender')

//here we include the dbConfig (intialization if there is such)
require('./config/db').then(() => {
  console.log('Database is ready!')
  http
    //the request is what we recieved, res will be 
    //what we return as answer
    .createServer((req, res) => {
      //NOTE: the res and req, are streams and need ot be parsed i think ? 

      req.pathname = url.parse(req.url).pathname
      req.pathquery = qs.parse(url.parse(req.url).query)

      
      // we give the params to each handler
      // and then we use the function and check what result it gives us
      // in the handler we have a checkup for 
      // method and path

      for (let handler of handlers) {
        //it loops through all of the handlers 
        //and does any possible actions, 
        // in each action we either do it or don`t, according
        //to the method and path
        //
        if (!handler(req, res)) {
          break
        }
      }

      
    })
    .listen(port, m => {
      console.log(`Server is running`);
    })

})
  .catch(err => {
    throw err
  });

