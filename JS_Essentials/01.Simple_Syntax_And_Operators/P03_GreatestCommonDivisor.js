function solve(numOne, numTwo) {
    for (let i = numTwo; i >= 1; i--) {
        if (numOne % i === 0 && numTwo % i === 0) {
            console.log(i);
            return;
        }
    }
}

solve(
    2154, 458
);