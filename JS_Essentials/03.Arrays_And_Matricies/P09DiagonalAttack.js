function solve(input) {

    let matrix= [];
    let secondDiagonalIndicies=[];
    
    matrix = fillInMatrix(input,matrix);
    
    let size = matrix.length;

    let firstDiagonalSum = 0;
    let secondDiagonalSum=0;

    firstDiagonalSum= getFirstDiagonal(size,matrix,firstDiagonalSum);
    secondDiagonalSum=getSecondDiagonal(size,matrix,secondDiagonalSum);
    
    if (firstDiagonalSum===secondDiagonalSum) {
        
         matrix= modifyMatrix(matrix);
    }

    printMatrix(matrix);



    function  fillInMatrix(input,matrix) {
        for (const arrString of input) {
            let current= arrString.split(` `).map(Number);
            matrix.push(current);
        }
        
        return matrix;
    }

    function getFirstDiagonal(size, matrix,result) {

        let num = 0;
        while (num < size) {
            result += matrix[num][num];
            num++;
        }
        return result;
    }
    function getSecondDiagonal(size,matrix,result) {

        let colStart=0;
        let rowStart=matrix.length-1;
        while (colStart<matrix.length) {
            result+=matrix[rowStart][colStart];
            let stringIndicies= rowStart.toString()+colStart.toString();
            secondDiagonalIndicies.push(stringIndicies);
            colStart++;
            rowStart--;

        }

        return result;
    }

    function modifyMatrix(matrix){
        for (let row = 0; row < matrix.length; row++) {
        
            for (let col = 0; col < matrix[row].length; col++) {
                
                let indiciesAsStrings= row.toString()+col.toString();
    
                if (row===col ||secondDiagonalIndicies.includes(indiciesAsStrings)) {
                    
                    continue;
                }
                matrix[row][col]=firstDiagonalSum;
    
            }
            
        }
        return matrix;
    }
    
    function printMatrix(matrix){
        [...matrix].forEach(ar=> console.log(ar.join(` `)));
    }
}
