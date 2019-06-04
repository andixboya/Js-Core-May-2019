function solve(inputParams) {

    let [maxRow, maxCol, initRow, initCol] = inputParams;

    let matrix = [];

    matrix = generateEmptyMatrix(matrix);

    matrix[initRow][initCol] = 1;
    matrix = fillInDiagonallyTheNums(matrix, initRow, initCol);
    matrix = leftSideFillIn(matrix, initRow, initCol);
    matrix = rightSideFillIn(matrix, initRow, initCol);

    [...matrix].forEach(a => console.log(a.join(` `)));


    function generateEmptyMatrix(matrix) {
        for (let r = 0; r < maxRow; r++) {
            matrix[r] = [];
            for (let c = 0; c < maxCol; c++) {
                matrix[r][c] = undefined;
            }
        }
        return matrix;
    }

    function fillInDiagonallyTheNums(matrix, numRow, numCol) {

        let currentRow = numRow;
        let currentCol = numCol;
        let value = 1;

        while (currentRow > 0) {
            currentRow--;
            value++;
            matrix[currentRow][currentCol] = value;

            let beginning = Math.max(0, currentCol - (value - 1));
            let ending = Math.min(maxCol - 1, currentCol + (value - 1));
            matrix = fillInRow(matrix, beginning, ending, currentRow, value);
        }


        currentRow = numRow
        currentCol = numCol;
        value = 1;

        while (currentRow < matrix.length - 1) {
            currentRow++;
            value++;
            matrix[currentRow][currentCol] = value;

            let beginning = Math.max(0, currentCol - (value - 1));
            let ending = Math.min(maxCol - 1, currentCol + (value - 1));
            matrix = fillInRow(matrix, beginning, ending, currentRow, value);
        }

        return matrix;
    }

    function fillInRow(matrix, beginning, ending, row, value) {

        for (let col = beginning; col < ending + 1; col++) {
            matrix[row][col] = value;
        }
        return matrix;
    }

    function leftSideFillIn(matrix, initRow, initCol) {

        let currentRow = initRow;
        let currentCol = initCol;
        let value = 1;

        while (currentCol >= 0) {
            currentCol--;
            value++;
            matrix[currentRow][currentCol] = value;

            botSide(matrix, currentRow, currentCol, value);
            topSide(matrix, currentRow, currentCol, value);


        }

        return matrix;
    }

    function rightSideFillIn(matrix, initRow, initCol) {
        let currentRow = initRow;
        let currentCol = initCol;
        let value = 1;

        while (currentCol < maxCol - 1) {
            currentCol++;
            value++;
            matrix[currentRow][currentCol] = value;

            botSide(matrix, currentRow, currentCol, value);
            topSide(matrix, currentRow, currentCol, value);

        }
        return matrix;
    }

    function topSide(matrix, currentRow, currentCol, value) {

        //here we check first if the index exist
        currentRow--;
        currentRow = Math.max(0, currentRow);
        while (currentRow >= 0 && matrix[currentRow][currentCol] === undefined) {

            matrix[currentRow][currentCol] = value;
            //here we decrement , so it will get out of the while...
            currentRow--;
        }


    }
    
    function botSide(matrix, currentRow, currentCol, value) {

        //here we check first if the index exist
        currentRow++;
        currentRow = Math.min(currentRow, maxRow - 1);
        while (currentRow < maxRow - 1 && matrix[currentRow][currentCol] === undefined) {

            matrix[currentRow][currentCol] = value;
            //here we increment , so it will get out of the while... 
            currentRow++;
        }

    }
}

//backup
{
    // function fillInRest(){
    //     for (let row = 0; row < maxRow-1; row++) {

    //         let value = matrix[row].find(x=> x);
    //         let index= matrix[row].findIndex(x=> x);


    //     }
    // }
}