function solve(matrix) {

    let sumCondition = 0;
    let isEqual = true;
    for (let arr = 0; arr < matrix.length; arr++) {

        if (arr == 0) {
            sumCondition = matrix[arr].reduce((a, b) => a + b);
        }
        let currentSum = matrix[arr].reduce((a, b) => a + b)

        if (currentSum !== sumCondition) {
            isEqual = false;
            break;
        }
    }

    


    let whatever = 0; // this must be incremented? 
    // for (let r = 0; r < matrix.length; r++) {

    for (let c = 0; c < matrix[0].length; c++) {

        let currentSum = 0;
        for (let rI = 0; rI < matrix.length; rI++) {

            currentSum += matrix[rI][c];

        }
        if (sumCondition !== currentSum) {
            isEqual = false;
            break;
        }

        currentSum = 0;
        whatever++;
    }

    console.log(isEqual);
}
