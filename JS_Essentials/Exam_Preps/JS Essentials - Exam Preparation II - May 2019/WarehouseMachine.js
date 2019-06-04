function coffeeStorage() {

    {
        //brand
        //coffee
        //--name
        //--expire
        //--date
        //--quantity
    }

    let brands = {};

    let inputTextArea = document.getElementsByTagName(`textarea`)[0];
    // inputTextArea.value = '["IN, Batdorf & Bronson, Espresso, 2025-05-25, 20","IN, Folgers, Black Silk, 2023-03-01, 14","IN, Lavazza, Crema e Gusto, 2023-05-01, 5","IN, Lavazza, Crema e Gusto, 2023-05-02, 5","IN, Folgers, Black Silk, 2022-01-01, 10","IN, Lavazza, Intenso, 2022-07-19, 20","OUT, Dallmayr, Espresso, 2022-07-19, 5","OUT, Dallmayr, Crema, 2022-07-19, 5","OUT, Lavazza, Crema e Gusto, 2020-01-28, 2","REPORT","INSPECTION"]';

    let input = JSON.parse(inputTextArea.value);

    
    for (const inputLine of input) {
        let tokens = inputLine.split(`, `);

        const command = tokens.shift();

        switch (command) {

            case 'IN':
                addCommand(tokens);
                break;
            case 'OUT':
                removeCommand(tokens);
                break;
            case 'REPORT':
                let reportParagraph = document.querySelectorAll(`div p`)[0];
                reportCommand(reportParagraph);
                break;
            case 'INSPECTION':
                let inspectionParagraph = document.querySelectorAll(`div p`)[1];
                inspectionCommand(inspectionParagraph);
                break;
        }




        function addCommand(args) {

            let [brand, coffeName, expireDate, quantityToAdd] = args;
            quantityToAdd = Number(quantityToAdd);

            let currentCoffe = {
                coffeName,
                expireDate,
                quantity: quantityToAdd
            }
            let currentBrand = {}
            currentBrand[coffeName] = currentCoffe;


            if (!brands.hasOwnProperty(brand)) {
                brands[brand] = currentBrand;

            } else {

                if (!brands[brand].hasOwnProperty(coffeName)) {
                    brands[brand][coffeName] = currentCoffe

                } else {
                    let currentDate = expireDate;

                    let dateOfCoffee = brands[brand][coffeName].expireDate;

                    if (currentDate > dateOfCoffee) {
                        brands[brand][coffeName] = currentCoffe;
                    } else if (currentDate === dateOfCoffee) {
                        brands[brand][coffeName].quantity += quantityToAdd;
                    }


                }

            }


        }


        function removeCommand(args) {
            let [brand, coffeName, expireDate, quantityToRemove] = args;

            if (brands.hasOwnProperty(brand) && brands[brand].hasOwnProperty(coffeName)) {

                let expirationDateOfStockCoffe = brands[brand][coffeName].expireDate;

                if (expirationDateOfStockCoffe > expireDate) {

                    let stockQuantity = brands[brand][coffeName].quantity;

                    if (stockQuantity >= quantityToRemove) {
                        brands[brand][coffeName].quantity -= quantityToRemove;
                    }


                }

            }
        }

        function reportCommand(paragraphToChange) {

            for (const brName in brands) {

                const currentBrand = brands[brName];

                let coffeeList = Object.values(currentBrand);
                paragraphToChange.innerHTML += `${brName}: `
                let coffeeMessages = coffeeList.map(c => `${c.coffeName} - ${c.expireDate} - ${c.quantity}.`).join(` `);

                //both fields are filled , when you insert into one of them!
                // console.log(paragraphToChange.textContent);
                // console.log(paragraphToChange.innerHTML)
                
                
                paragraphToChange.innerHTML += coffeeMessages
                //first Option:
                // paragraphToChange.appendChild(document.createElement(`br`));
                //second Option
                paragraphToChange.innerHTML+=`<br>`
                
                // console.log(paragraphToChange.textContent);
                // console.log(paragraphToChange.innerHTML)
            }
        }

        function inspectionCommand(paragraphToChange) {

            let sortedKeys = Object.keys(brands).sort((a, b) => a.localeCompare(b));

            for (const brName of sortedKeys) {

                const currentBrand = brands[brName];

                let coffeeList = Object.values(currentBrand).sort((a, b) => b.quantity - a.quantity);
                paragraphToChange.innerHTML += `${brName}: `
                let coffeeMessages = coffeeList.map(c => `${c.coffeName} - ${c.expireDate} - ${c.quantity}.`).join(` `);

                paragraphToChange.innerHTML += coffeeMessages
                paragraphToChange.innerHTML += `<br>`
            }


        }
    }
}