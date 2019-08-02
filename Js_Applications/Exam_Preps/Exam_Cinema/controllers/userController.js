const userController = function () {

    const getRegister = function (context) {

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/register.hbs')
        })
    };

    const getLogin = function (context) {

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/login.hbs')
        })
    };


    const postRegister = function (context) {
        // function (endpoint, module, typeOfAuth, data)


        const payLoad = {
            username: context.params.username,
            password: context.params.password
        }
        requester.post(``, `user`, `Basic`, payLoad)
            .then(helper.handler)
            .then((data) => {
                
                sessionStorage.setItem(`authtoken`, data._kmd.authtoken);
                sessionStorage.setItem(`username`, data.username);
                context.redirect(`#/home`);
            })
    };

    
    const postLogin = function (context) {

        const payLoad = {
            username: context.params.username,
            password: context.params.password
        }
        // function (endpoint, module, typeOfAuth, data)
        requester.post(`login`, `user`, `Basic`, payLoad)
            .then(helper.handler)
            .then((data) => {
                sessionStorage.setItem(`authtoken`, data._kmd.authtoken);
                sessionStorage.setItem(`username`, data.username);
                context.redirect(`#/home`);
            })
    }


    const logOut = function (context) {
        // function (endpoint, module, typeOfAuth, data)
        helper.addHeaderInfo(context);
        
        requester.post(`_logout`, `user`, `Kinvey`)
            .then(helper.handler)
            .then(() => {
                sessionStorage.clear();
                context.redirect(`#/home`);
            })
    }



    return {
        getRegister,
        getLogin,
        postRegister,
        postLogin,
        logOut,
    }
}();