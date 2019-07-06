const FilmStudio = require(`./filmStudio.js`);
const assert = require(`chai`).assert;
// const expect= require(`chai`).expect;

describe(`FilmStudio`, function () {
    let filmStudio;
    const initialName = `StarWars`
    //first and second will be identical
    const firstMovie = `FirstMovie`;
    const secondMovie = `FirstMovie`;
    const thirdMovie=`whatever`;


    const firstRoles = [`firstRole`, `secondRole`];
    const secondRoles = [`fourthRole`, `fifthRole`];

    beforeEach(function () {
        filmStudio = new FilmStudio(initialName);
    })

    it('should have a ctor with one param', function () {

        assert.isEmpty(filmStudio.films);
        assert.equal(filmStudio.name, initialName);
        assert.instanceOf(filmStudio, FilmStudio);
    })

    //for movie was  hell?
    it('should have method makeMovie', function () {
        //first film
        filmStudio.makeMovie(firstMovie, firstRoles);

        let actualFilm = filmStudio.films[0];
        let expectedFilm = firstMovie;
        let actualNameOfFilm = actualFilm.filmName
        let actualActors = actualFilm.filmRoles;

        //just in case
        assert.isString(firstMovie);
        assert.isArray(firstRoles);



        assert.equal(filmStudio.films.length, 1);
        assert.equal(expectedFilm, actualNameOfFilm);

        for (const i in firstRoles) {
            const expectedActor = firstRoles[i];
            const actualActor = actualActors[i].role;
            assert.equal(expectedActor, actualActor);
        }

        //second film
        filmStudio.makeMovie(secondMovie, secondRoles);
        actualFilm = filmStudio.films[1].filmName;
        expectedFilm = `FirstMovie 2`;
        assert.equal(expectedFilm,actualFilm );


        //third film
        filmStudio.makeMovie(thirdMovie,firstRoles);

        actualFilm=filmStudio.films[2].filmName;
        expectedFilm=thirdMovie;
        assert.equal(expectedFilm,actualFilm);
    })

    //for movie was  hell?
    it('makeMovie should throw errors', function () {
        //first film
        


        assert.throw(()=> {filmStudio.makeMovie(1,[`haha`,`bla`])},'Invalid arguments');
        assert.throw(()=> {filmStudio.makeMovie(1)},`Invalid arguments count`);
        


    })

    //for casting
    it('should have method casting', function () {
        
        const actorOne= `gosho`;
        const role=`zvezda`;
        const movie=`whatever`;
        const roles=[`zvezda`,`haha`];
        const emptyRoles=[`not a role`,`not a role too`];

        //in case of no films
        let actual= filmStudio.casting(actorOne,role);
        let expected="There are no films yet in StarWars.";
        assert.equal(expected,actual);

        
        //in case of no spots:
        filmStudio.makeMovie(movie,emptyRoles);

        actual=filmStudio.casting(actorOne,role);
        expected="gosho, we cannot find a zvezda role...";
        assert.equal(expected,actual);

        //in case there is such role:
        filmStudio.makeMovie(movie,roles);
        actual=filmStudio.casting(actorOne,role);
        expected="You got the job! Mr. gosho you are next zvezda in the whatever 2. Congratz!";
        assert.equal(expected,actual);


    })

    //for look for producer method
    it('should have look for producer method', function () {
        
        const movie=`whatever`;
        const roles=[`zvezda`,`haha`];

        //in case it does not exist
        assert.throws(()=> filmStudio.lookForProducer(movie),`whatever do not exist yet, but we need the money...`);

        //in case it exists
        filmStudio.makeMovie(movie,roles);
        let expected= filmStudio.lookForProducer(movie);
        let actual= `Film name: whatever\nCast:\nfalse as zvezda\nfalse as haha\n`
        assert.equal(expected,actual);
        
    })

})

