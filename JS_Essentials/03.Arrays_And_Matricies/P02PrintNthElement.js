function solve(arr) {

    let step = arr.pop();
    let resultNums=[];

    for (let i = 0; i < arr.length; i++) {
        const currentNum = arr[i];

        if (i%step===0) {

            resultNums.push(currentNum);
        }
    }
    console.log(resultNums.join(`\n`));

}
