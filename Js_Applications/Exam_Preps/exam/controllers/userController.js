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


        const isValid = helper.passwordCheck(context.params);
        const payLoad = {
            username: context.params.username,
            password: context.params.password,
            itemsBought: 0
        }

        if (!payLoad.username || !payLoad.password || !isValid) {
            context.redirect(`#/register`);
            return;
        }



        requester.post(``, `user`, `Basic`, payLoad)
            .then(helper.handler)
            .then((data) => {

                sessionStorage.setItem(`authtoken`, data._kmd.authtoken);
                sessionStorage.setItem(`username`, data.username);
                sessionStorage.setItem(`id`, data._id)
                sessionStorage.setItem(`creator`, data._acl.creator)
                sessionStorage.setItem(`data`, data);
                sessionStorage.setItem(`itemsBought`, data.itemsBought)
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
                sessionStorage.setItem(`id`, data._id)
                sessionStorage.setItem(`creator`, data._acl.creator)
                sessionStorage.setItem(`itemsBought`, data.itemsBought)

                context.redirect(`#/home`);
            })
    }


    const logOut = function (context) {
        // function (endpoint, module, typeOfAuth, data)
        helper.addHeaderInfo(context);

        requester.post(`_logout`, `user`, `Kinvey`)
            .then(helper.handler)
            .then(() => {
                notifications.showSuccess(`Logged out successfully.`)
                sessionStorage.clear();
                context.redirect(`#/home`);
            })
    }

    const getUser = function (context) {
        

        const id = sessionStorage.id;
        
        let endPoint = `${id}`;

        requester.get(endPoint, `user`, `Kinvey`)
            .then(helper.handler)
            .then(user => {

                context.user=user;
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/user/user.hbs')
                })

            })


      

    }
    const buy = function (context) {

        helper.addHeaderInfo(context);



        const id = sessionStorage.id;

        
        let endPoint = `${id}`;

        requester.get(endPoint, `user`, `Kinvey`)
            .then(helper.handler)
            .then(user => {

                console.log(user);
                
                user.itemsBought++;
                

                requester.put(endPoint,`user`,`Kinvey`,user)
                .then(helper.handler)
                .then(context.redirect(`#/getAll`))
            })

    }


    return {
        getRegister,
        getLogin,
        postRegister,
        postLogin,
        logOut,
        getUser,
        buy
    }
}();