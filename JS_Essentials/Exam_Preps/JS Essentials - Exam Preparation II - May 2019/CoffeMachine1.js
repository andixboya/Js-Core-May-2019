function solve(arr) {

    let prices = {caffeine: 0.80, decaf: 0.90, tea: 0.80};
    let currentPrice = 0;

    let incomeEarned=0;
    for (let order of arr) {
        let tokens = order.split(`, `);

        let coinsInserted = +tokens[0];
        let typeOfDrink = tokens[1];
        //token3 optional
        //optional if it is milk
        //quantity of sugar...
        let sugar = Number(tokens[tokens.length - 1]);
        let sugarExpenses = 0;
        if (sugar > 0) {
            sugarExpenses = 0.1;
        }

        let diff = 0;
        let totalExpenses=0;
        if (typeOfDrink === `coffee`) {
            let caffeineOrDecaf = tokens[2];
            currentPrice = prices[caffeineOrDecaf];
            if (tokens.length === 5) {
                let milkExpenses = +(0.1 * currentPrice).toFixed(1);
                totalExpenses=milkExpenses+sugarExpenses+currentPrice;
                diff = coinsInserted - totalExpenses;
            }
            else {
                totalExpenses=sugarExpenses+currentPrice;
                diff=coinsInserted-totalExpenses;
            }
        } else {// in case of tea\
            currentPrice=prices[typeOfDrink];
            if (tokens.length===4){
                let milkExpenses = +(0.1 * currentPrice).toFixed(1);
                totalExpenses=currentPrice+sugarExpenses+milkExpenses;
                diff= coinsInserted-totalExpenses;
            }
            else {
                totalExpenses=currentPrice+sugarExpenses;
                diff= coinsInserted-totalExpenses;
            }
        }


        if (diff>=0){
            console.log(`You ordered ${typeOfDrink}. Price: ${totalExpenses.toFixed(2)}$ Change: ${diff.toFixed(2)}$`);
            incomeEarned+=totalExpenses;
        } else  {
            diff= Math.abs(diff);
            console.log(`Not enough money for ${typeOfDrink}. Need ${diff.toFixed(2)}$ more.`);
        }

    }
    console.log(`Income Report: ${incomeEarned.toFixed(2)}$`);
}