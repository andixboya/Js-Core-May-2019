const app = Sammy("#container", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);
    
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);
    
    this.get('#/logout', userController.logOut);
    
    //Movie
 
    this.get(`#/add`,movieController.addGet)
    this.get(`#/cinema`,movieController.getAll)
    this.get(`#/myMovies`,movieController.myMovies)
    this.get(`#/edit/:id`,movieController.editGet)
    this.get(`#/details/:id`,movieController.details)
    this.get(`#/delete/:id`,movieController.delGet),
    this.get(`#/buy/:id`,movieController.buy)
    
    
    this.post(`#/add`,movieController.addPost)
    this.post(`#/delete/:id`,movieController.delPost)
    this.post(`#/edit/:id`,movieController.editPost)
    
});

(() => {
    app.run('#/home');
})();