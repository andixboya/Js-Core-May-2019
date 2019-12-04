const Cube = require('../models/CubeSchema');

module.exports = {

    homeGet: (req, res) => {
        
        //by default will start for search in Views()
        Cube.find({}).then(cubes => {
            
            res.render('index', {cubes})

        })
            .catch(er => {
                console.log(er)
            })
    }

}