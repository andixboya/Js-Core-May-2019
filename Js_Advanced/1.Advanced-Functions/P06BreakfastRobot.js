// manager("restock flavour 50");
// manager("prepare coke 4");
let manager = (function () {

    let stash = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    let recepies = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    }

    function restock() {
        let microElement = arguments[0][0];
        let quantity = +arguments[0][1];
        stash[microElement] += quantity;
        return `Success`;
    }

    function prepare() {
        let recipe = arguments[0][0];
        let quantity = +arguments[0][1];

        let ingredients = Object.entries(recepies[recipe]);

        let message = ``;
        //validate ingredients!
        let isEnough = true;

        for (const [ingr, cost] of ingredients) {

            let totalCost = cost * quantity;

            let currentStashOfingr = stash[ingr];

            if (currentStashOfingr < totalCost) {
                message = `Error: not enough ${ingr} in stock`;
                isEnough = false;
                break;
            }
        }

        if (isEnough) {
            for (const [ingr, cost] of ingredients) {

                let totalCost = cost * quantity;
                stash[ingr] -= totalCost;
            }
            message = `Success`;

        }

        return message;

    }

    function report() {
        let message = Object.entries(stash)
            .map(p => `${p[0]}=${p[1]}`)
            .join(` `);

        return message;
    }

    return function interpreter(input) {

        let tokens = input.split(` `);
        let command = tokens.shift();

        let message = ``;
        switch (command) {
            case `restock`:
                message = restock(tokens);
                break;

            case `prepare`:
                message = prepare(tokens);
                break;
            case `report`:
                message = report();
                break;
        }

        return message;

    }
})();

// console.log(manager('restock carbohydrate 10'));
// console.log(manager('restock flavour 10'));
// console.log(manager('prepare apple 1'));
// console.log(manager('restock fat 10'));
// console.log(manager('prepare burger 1'));
// console.log(manager('report'));

// console.log(manager(`prepare turkey 1`));
// console.log(manager(`restock protein 10`));
// console.log(manager(`prepare turkey 1`));
// console.log(manager(`restock carbohydrate 10`));
// console.log(manager(`prepare turkey 1`));
// console.log(manager(`restock fat 10`));
// console.log(manager(`prepare turkey 1`));
// console.log(manager(`restock flavour 10`));
// console.log(manager(`prepare turkey 1`));
// console.log(manager(`report`));
