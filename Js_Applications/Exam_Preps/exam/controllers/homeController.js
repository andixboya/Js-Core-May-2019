const homeController = function () {

    const getHome = function (context) {


        helper.addHeaderInfo(context);

        const loggedIn = context.loggedIn;


            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",
                // recipes: "../views/recipe/allRecipes.hbs",
                // recipe: "../views/recipe/single-recipe.hbs"
            }).then(function () {
                // debugger;
                this.partial('../views/common/home.hbs')
            })




    };

    return {
        getHome
    }
}();