(() => {

    //note: please install handlebars locally in the folder, because it is not responding to the one given in the folder,
    //thank you!
    const toggleStatusInfo = function (target) {
        let display = target.style.display;
        if (display === `none`) {
            target.style.display = `block`
        } else {
            target.style.display = `none`;
        }
    }

    const displayInfo = function ({ target }) {

        if (target.classList.contains(`showBtn`)) {

            const parent = target.parentNode;

            const targetToChange = parent.querySelector(`div.status`);
            toggleStatusInfo(targetToChange);
        }

    }

    renderCatTemplate();
    
    async function renderCatTemplate() {

        const elements = {
            sectionAllCats: document.querySelector(`#allCats`)
        }
        elements.sectionAllCats.addEventListener(`click`, displayInfo);

        let cats = window.cats;
        cats = { cats };

        let html = await fetch(`./templates/cat.hbs`);
        let res = await html.text();
        const catTemplate = Handlebars.compile(res);
        Handlebars.registerPartial(`cat`, catTemplate);

        html = await fetch(`./templates/cats-template.hbs`);
        res = await html.text();
        const catsTemplate = Handlebars.compile(res);
        
        elements.sectionAllCats.innerHTML = catsTemplate(cats);
    }
})();
