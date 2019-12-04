const Cube = require('../models/CubeSchema');


module.exports = {
    getCreate: function (req, res) {
        //here.... WITHOUT THE FIRST "/"
        debugger
        res.render('cube/create');
    },

    postCreate: function (req, res) {
        debugger
        let cubeToAdd = req.body;
        cubeToAdd.difficulty = parseInt(req.body.difficulty);
        // let num= Number(req.body.difficulty);

        Cube.create(cubeToAdd).then(cube => {
            res.redirect('/', 301)
        })
            .catch(er => {
                console.log(er)
                res.redirect('/')
            })
    },
    getDetails: function (req, res) {

        let id = req.params.anyName
        Cube.findById(id).then(cube => {

            res.render('cube/details', cube)
        })
            .catch(er => {

                console.log(er);
                redirect('/')
            })
    },
    getAbout: function (req, res) {

        res.render('cube/about')
    }
}