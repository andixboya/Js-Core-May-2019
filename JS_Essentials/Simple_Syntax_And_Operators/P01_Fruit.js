function solve(typeOfFruit, number, grams) {

    let kg = number / 1000;

    let expenses = (kg * grams).toFixed(2);
    console.log(`I need $${expenses} to buy ${kg.toFixed(2)} kilograms ${typeOfFruit}.`);
}

solve(
    'apple', 1563, 2.35
);