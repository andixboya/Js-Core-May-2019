( function displayTowns() {

    const elements = {
        loadTownsBtn: document.querySelector(`#btnLoadTowns`),
        townsInput: document.querySelector(`#towns`),
        rootDiv: document.querySelector(`#root`)
    }
    
    const loadTowns = async function loadTowns({ target }) {
        console.log(target);
        const towns = [...elements.townsInput.value.split(`, `)]
            .map(function (name) {
                const town = { name }
                return town;
            });
            //if you don`t convert them into objects with names, it will not get the data!

        console.log(towns);
        const data = { towns }

        let res = await fetch(`./templates/town.hbs`);
        let html = await res.text();

        const townTemplate = Handlebars.compile(html);


        Handlebars.registerPartial(`town`, townTemplate);

        res = await fetch(`./templates/towns.hbs`);
        html = await res.text();
    

        const townsTemplate = Handlebars.compile(html);
        elements.rootDiv.innerHTML=townsTemplate(data);

        elements.townsInput.value=``;
    }

    elements.loadTownsBtn.addEventListener(`click`, loadTowns);
})();