(async function showElements() {

    const contacts = [
        {
            id: 1,
            name: "John",
            phoneNumber: "0847759632",
            email: "john@john.com"
        },
        {
            id: 2,
            name: "Merrie",
            phoneNumber: "0845996111",
            email: "merrie@merrie.com"
        },
        {
            id: 3,
            name: "Adam",
            phoneNumber: "0866592475",
            email: "adam@stamat.com"
        },
        {
            id: 4,
            name: "Peter",
            phoneNumber: "0866592475",
            email: "peter@peter.com"
        },
        {
            id: 5,
            name: "Max",
            phoneNumber: "0866592475",
            email: "max@max.com"
        },
        {
            id: 6,
            name: "David",
            phoneNumber: "0866592475",
            email: "david@david.com"
        }
    ];
    
    const elements = {
        contactsContainer: document.querySelector(`#contacts`)
    }
    const getInfoElement= function (target) {
        let parent= target.parentNode;
        target= parent.querySelector(`div.details`);
        console.log(target);
        // debugger;

        //TODO:
        // while (parent !== undefined && !parent.classList.contains(`contact card`)) {
        //     debugger
        //     parent=parent.parentNode;
        //     console.log(parent);
        // }

        return target;
    }
    const toggleDisplay= function (parent) {
        
        let currentDisplay=parent.style.display;
        if (currentDisplay===``) {
            parent.style.display=`block`;
        } else {
            parent.style.display=``;
        }
    }

    const showInfo= function ({target}) {
        
        // debugger
        if (target.classList.contains(`detailsBtn`)) {
            
            const elementToToggle= getInfoElement(target);
            toggleDisplay(elementToToggle);

        } 
    }

    elements.contactsContainer.addEventListener(`click`,showInfo);
    //get first resources
    let res = await fetch(`./templates/contact-card-template.hbs`);
    let contactHtml = await res.text();

    //get second resources
    res = await fetch(`./templates/contacts-template.hbs`);
    let contactsHtml = await res.text();

    //compile html into an template
    const contactTemplate = Handlebars.compile(contactHtml);
    const contactsTemplate = Handlebars.compile(contactsHtml);
    
    //register the first as partial (usually compilation and registration were mixed , but not in this case i guess)
    Handlebars.registerPartial(`contact`, contactTemplate);

    //always submit as obj?
    const context = { contacts }
    
    //its html, not element!!!! add to the html the template, while adding it within the template
    elements.contactsContainer.innerHTML=contactsTemplate(context);
})();