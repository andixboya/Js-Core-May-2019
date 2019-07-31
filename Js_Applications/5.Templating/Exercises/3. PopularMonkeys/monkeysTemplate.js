$(async () => {

    //note: please install handlebars locally in the folder, because it is not responding to the one given in the folder,
    //thank you!
    const elements = {
        monkeysDiv: document.querySelector(`div.monkeys`)
    }

    const toggleDisplay= function (target) {
        
        let display= target.style.display;

        if (display===`none`) {
            target.style.display=`block`
        } else {
            target.style.display=`none`;
        }
    }

    const showAdditionalInfo = function ({ target }) {

        const parent = target.parentNode;
        const elementToDisplay= parent.querySelector(`p`);
        console.log(elementToDisplay);
        
        toggleDisplay(elementToDisplay);
        //         <div class="monkey">
        //     <h2>{{name}}</h2>
        //     <img src="./{{image}}">
        //     <button>Info</button>
        //     <p style="display: none" id="{{id}}">
        //         {{info}}
        //     </p>
        // </div>
    }

    elements.monkeysDiv.addEventListener(`click`, showAdditionalInfo);

    let res = await fetch(`./templates/monkey.hbs`);
    let html = await res.text();

    const monkeyTemplate = Handlebars.compile(html);

    Handlebars.registerPartial(`monkey`, monkeyTemplate);

    res = await fetch(`./templates/monkeys.hbs`);

    html = await res.text();
    const monkeysTemplate = Handlebars.compile(html);

    const data = {
        monkeys
    }

    elements.monkeysDiv.innerHTML = monkeysTemplate(data);
})