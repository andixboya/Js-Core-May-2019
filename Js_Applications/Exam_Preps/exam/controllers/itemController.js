const itemController = function () {

    const addGet = async function (context) {

        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/item/create.hbs')
        })
        // .catch(er=>{
        //     // notifications.showError(er);
        // })
    };

    const addPost = function (context) {

        helper.addHeaderInfo(context);
        const payLoad = {
            product: context.params.product,
            price: Number(context.params.price),
            description: context.params.description,
            pictureUrl: context.params.pictureUrl,
        }

        
        if (!payLoad.product ||
            !payLoad.price ||
            !payLoad.description) {

            context.redirect(`#/getAll`)
            return;
        }

        if (!payLoad.pictureUrl.startsWith(`http://`)) {

            if (!payLoad.pictureUrl.startsWith(`https://`)) {
                context.redirect(`#/getAll`);
            }

        }


        // const post = function (endpoint, module, type, data) {
        requester.post(`items`, `appdata`, `Kinvey`, payLoad)
            .then(helper.handler)
            .then(item => {
                // notifications.showSuccess(`Created successfully.`)
                context.redirect(`#/getAll`)
            })
    };


    const getAll = function (context) {

        helper.addHeaderInfo(context);
        // const get = function (endpoint, module, typeOfAuthorization) {
        requester.get(`items`, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(items => {


                const creator = sessionStorage.creator;
                console.log(creator)
                const hasItems = items.length;
                context.hasItems = hasItems;

                items.forEach(i => {
                    i.isOwn = i._acl.creator === creator
                })

                context.items = items;
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                    'single-item': "../views/item/single-item.hbs"
                }).then(function () {
                    this.partial('../views/item/dashboard.hbs')
                })

            })


    }




    const editGet = function (context) {

        const id = context.params.id;

        let endPoint = `items/${id}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(item => {


                context.item = item;

                helper.addHeaderInfo(context);
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/item/edit.hbs')
                })

            })
    };


    const delGet = function (context) {

        helper.addHeaderInfo(context);
        const id = context.params.id;


        let endPoint = `items/${id}`;


        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(item => {


                context.item = item;

                helper.addHeaderInfo(context);
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/item/delete.hbs')
                })

            })

    }

    const details = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        let endPoint = `items/${id}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(item => {


                context.item = item;
                const creator = sessionStorage.creator;
                context.isCreator = creator === item._acl.creator;

                // notifications.showSuccess(`Loaded recipe.`)
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/item/details.hbs')
                })

            })
    }

    const delPost = function (context) {
        helper.addHeaderInfo(context);

        const itemId = context.params.id;

        const endPoint = `items/${itemId}`;


        requester.del(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(res => {
                console.log(res)

                context.redirect(`#/getAll`)
            })
            .catch(er => console.log(er));

    }


    const editPost = function (context) {
        helper.addHeaderInfo(context);


        const itemId = context.params.id;
        const endPoint = `items/${itemId}`;



        const payLoad = {
            product: context.params.product,
            price: Number(context.params.price),
            description: context.params.description,
            pictureUrl: context.params.pictureUrl,
        }



        requester.put(endPoint, `appdata`, `Kinvey`, payLoad)
            .then(helper.handler)
            .then(res => {
                console.log(res)

                // notifications.showSuccess(`Edited Successfully!`)
                context.redirect(`#/getAll`)
            })
            .catch(er => console.log(er));

    }


    const modify = function (context) {
        helper.addHeaderInfo(context);

        const recipeId = context.params.id;

        let endPoint = `recipes/${recipeId}`;

        requester.get(endPoint, `appdata`, `Kinvey`)
            .then(helper.handler)
            .then(recipe => {

                recipe.likes++;

                return requester.put(`recipes/${recipeId}`, `appdata`, `Kinvey`, recipe)
            })
            .then(helper.handler)
            .then(er => {
                notifications.showSuccess(`Modified successfully!`)
                context.redirect(`#/home`)
            })
            .catch(er => console.log(er));
    }


    return {
        addGet,
        editGet,
        details,
        delGet,
        addPost,
        getAll,
        delPost,
        editPost,
        modify,


    }
}();