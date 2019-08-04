const app = Sammy("#rooter", function () {


    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);
    
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);
    
    this.get('#/logout', userController.logOut);
    
    // Items
    this.get(`#/create`,itemController.addGet)
    this.get(`#/getAll`,itemController.getAll)
    this.get(`#/details/:id`,itemController.details)
    this.get(`#/edit/:id`,itemController.editGet)
    this.get(`#/delete/:id`,itemController.delGet);
    this.get(`#/user`,userController.getUser)
    this.get(`#/buy`,userController.buy)
    // this.get(`#/modify/:id`,recipeController.modify) 
    

    this.post(`#/create`,itemController.addPost)
    this.post(`#/edit/:id`,itemController.editPost)
    this.post(`#/delete/:id`,itemController.delPost)
    
    
});

(() => {
    app.run('#/home');
})();