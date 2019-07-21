(function attachEvents() {

    const constants = {
        catches: document.querySelector(`#catches`),
        sampleCatch: document.querySelector(`div.catch`),
        loadBtn: document.querySelector(`button.load`),
        addBtn: document.querySelector(`button.add`),
        loadAllUrl: `https://fisher-game.firebaseio.com/catches.json`,

    }
    
    constants.catches.style.display = `none`;
    
    constants.loadBtn.addEventListener(`click`, loadAllCatches);
    constants.addBtn.addEventListener(`click`, addNewCatch)

    function loadAllCatches() {

        fetch(constants.loadAllUrl)
            .then(resolveRequest)
            .then(objects => {

                //for clearing the repeated entries
                constants.catches.innerHTML = ``;
                constants.catches.style.display = `block`;

                const entries = Object.entries(objects);

                const fragment = document.createDocumentFragment();
                entries.forEach(entry => {

                    const [key, catchObj] = entry;
                    const currentCatch = listCurrentCatch(key, catchObj);
                    fragment.appendChild(currentCatch);
                })

                constants.catches.appendChild(fragment);
            });
    }

    function addNewCatch() {
        const inputFields = Array.from(document.querySelectorAll(`#addForm input`));

        //NOTE: check this , and learn it! DON`T FORGET TO ADD THE ACC. obj!
        let data = inputFields.reduce((acc, curr) => {
            let prop = curr.className;
            acc[prop] = curr.value;
            // debugger;
            return acc;
        }, {});

        // for (let inputIndex = 0; inputIndex < inputFields.length; inputIndex++) {
        //     const value = inputFields[inputIndex].value;
        //     const key= inputFields[inputIndex].className;

        //     data[key]=value;
        //     debugger;
        // }
        let body = JSON.stringify(data);

        //note: doesn`t matter if the headers are called headers, what is important is that 
        //the method is method and BODY is named BODY! (object to put/delete)
        const createUrl = `https://fisher-game.firebaseio.com/catches.json`;
        const headers = {
            method: `POST`,
            body
        }

        // debugger;
        fetch(createUrl, headers)
            .then(resolveRequest)
            .then(() => {
                loadAllCatches();
            })
            .catch(err => console.log(err));
    }

    
    function listCurrentCatch(identifier, catchObj) {

        const copyNode = constants.sampleCatch.cloneNode(true);
        const arr = Object.entries(catchObj);
        // console.log(arr);

        //note: problem with the distribution of info through the input fields
        // debugger;
        //note: mistake here!!!!! the arrangement!
        const inputFields = Array.from(copyNode.querySelectorAll(`input`)).sort((a, b) => a.className.localeCompare(b.className));

        for (let inputIndex = 0; inputIndex < arr.length; inputIndex++) {
            const [key, value] = arr[inputIndex];

            const currentInput = inputFields[inputIndex];

            currentInput.setAttribute(`value`, value);
        }
        //note: this is how we`ll identify them?
        copyNode.setAttribute(`data-identifier`, identifier);

        const updateBtn = copyNode.querySelector(`button.update`);
        const deleteBtn = copyNode.querySelector(`button.delete`);
        updateBtn.addEventListener(`click`, updateCatch)
        deleteBtn.addEventListener(`click`, deleteCatch)

        return copyNode;
    }

    function updateCatch(e) {
        const parent = e.target.parentNode;
        const catchId = parent.getAttribute(`data-identifier`);
        const inputFields = Array.from(parent.querySelectorAll(`input`));

        //note: MISTAKE=> DON`T EVER FORGET THE OBJECT ACCUMULATOR , MENTION IT EXPLICITLY!
        const info = inputFields.reduce((acc, curr) => {

            const prop = curr.className;
            acc[prop] = curr.value;
            // debugger;
            return acc;
        }, {})

        const updateUrl = `https://fisher-game.firebaseio.com/catches/${catchId}.json`;
        // debugger;
        const data = {
            method: `PUT`,
            body: JSON.stringify(info)
        }
        // debugger
        fetch(updateUrl, data)
            .then(resolveRequest)
            .then(constants.loadBtn.click)
            .catch(err => console.log(err));
    }
    
    function deleteCatch(e) {
        const parent = e.target.parentNode;
        const catchId = parent.getAttribute(`data-identifier`);

        const deleteUrl = `https://fisher-game.firebaseio.com/catches/${catchId}.json`;

        fetch(deleteUrl, {
            method: `DELETE`
        })
            .then(resolveRequest)
            .then(() => {
                parent.remove();
            })
    }

    function resolveRequest(response) {

        const status = response.status

        if (status >= 400) {
            throw new Error(`Error: ${response.statusText}`);

        }
        return response.json();
    }
})();
// attachEvents();