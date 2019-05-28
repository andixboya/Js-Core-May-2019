function solve(input) {

    // in case it is an integer ?

    let [x1, y1, x2, y2] = input;

    checkIfValid(x1, y1, 0, 0);
    checkIfValid(x2, y2, 0, 0);
    checkIfValid(x1, y1, x2, y2);

    function checkIfValid(x1, y1, x2, y2) {
        let first = x1 - x2;
        let second = y1 - y2;

        let sum = Math.sqrt(Math.pow(first, 2) + Math.pow(second, 2), 2);
        let string = sum.toString();

        if (string.includes(`.`)) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`)
            return false;
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`)
            true;
        }

    }

}
solve(
    [2, 1, 1, 1]
)