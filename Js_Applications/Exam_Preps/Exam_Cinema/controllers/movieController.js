const movieController = function () {

    const addGet = async function (context) {

        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/movie/add.hbs')
        })
    };

    const addPost = function (context) {

        helper.addHeaderInfo(context);

        const payLoad = {
            title: context.params.title,
            description: context.params.description,
            imageUrl: context.params.imageUrl,
            genres: context.params.genres,
            tickets: Number(context.params.tickets)
        }

        // const post = function (endpoint, module, type, data) {
        requester.post(`movies`, `appdata`, `Kinvey`, payLoad)
            .then(helper.handler)
            .then(context.redirect(`#/cinema`))

    };


    const getAll = function (context) {

        helper.addHeaderInfo(context);
        // const get = function (endpoint, module, typeOfAuthorization) {
        requester.get(`movies?query={}&sort{"tickets":-1}`, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(movies => {

                context.movies = movies;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                    'single-movie': "../views/movie/single-movie.hbs"
                }).then(function () {
                    this.partial('../views/movie/cinema.hbs')
                })

            })


    }



    const myMovies = function (context) {

        helper.addHeaderInfo(context);

        const username = sessionStorage.getItem(`username`);

        const endPoint = `movies?query{"creator":${username}}&sort={"tickets":-1}`

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(movies => {
                context.movies = movies;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                    movie: "../views/movie/my-single-movie.hbs"
                }).then(function () {
                    this.partial('../views/movie/my-movies.hbs')
                })
            })
    }
    const editGet = function (context) {

        const id = context.params.id;

        let endPoint = `movies/${id}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(movie => {

                context.movie = movie;

                helper.addHeaderInfo(context);
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/movie/edit.hbs')
                })

            })
    };


    const delGet = function (context) {

        helper.addHeaderInfo(context);
        const id = context.params.id;


        let endPoint = `movies/${id}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(movie => {

                context.movie = movie;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/movie/delete.hbs')
                })

            })

    }

    const details = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        let endPoint = `movies/${id}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(movie => {

                context.movie = movie;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/movie/details.hbs')
                })

            })
    }

    const delPost = function (context) {
        helper.addHeaderInfo(context);

        const movieId = context.params.id;

        const endPoint = `movies/${movieId}`;


        requester.del(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(res => {
                console.log(res)

                context.redirect(`#/myMovies`)
            })
            .catch(er => console.log(er));

    }


    const editPost = function (context) {
        helper.addHeaderInfo(context);

        const movieId = context.params.id;
        const endPoint = `movies/${movieId}`;
        const payLoad = {
            title: context.params.title,
            description: context.params.description,
            imageUrl: context.params.imageUrl,
            genres: context.params.genres,
            tickets: Number(context.params.tickets)
        }


        requester.put(endPoint, `appdata`, `Kinvey`, payLoad)
            .then(helper.handler)
            .then(res => {
                console.log(res)
                context.redirect(`#/myMovies`)
            })
            .catch(er => console.log(er));

    }


    const buy = function (context) {

        helper.addHeaderInfo(context);

        const movieId = context.params.id;

        let endPoint = `movies/${movieId}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(movie => {

                if (movie.tickets===0) {
                    return;
                }
                
                movie.tickets--;
                return requester.put(`movies/${movieId}`, `appdata`, `Kinvey`, movie)
            })
            .then(helper.handler)
            .then(context.redirect(`#/myMovies`))
            .catch(er => console.log(er));
    }

    return {
        addGet,
        getAll,
        myMovies,
        editGet,
        delGet,
        addPost,
        delPost,
        editPost,
        buy,
        details
    }
}();




