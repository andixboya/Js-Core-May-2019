const homeController = require('../controllers/home')
const cubeController = require('../controllers/cube')

module.exports = app => {

    app.get('/', homeController.homeGet)
    app.get('/Cube/create', cubeController.getCreate)
    app.post('/Cube/create', cubeController.postCreate)
    app.get('/Cube/details/:anyName', cubeController.getDetails)
    app.get('/Cube/about',cubeController.getAbout)
};
