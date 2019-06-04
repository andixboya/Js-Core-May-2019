function solve(input) {

    let arr = [];

    let lastNumber=0;
    for (const com of input) {

        lastNumber++;
        if (com === 'add') {
            
            arr.push(lastNumber);
        } else if (com === `remove`) {

            if (arr.length > 0) {
                arr.pop();
            }

        }

    }


    if (arr.length > 0) {
        console.log(arr.join(`\n`))

    } else {
        console.log(`Empty`);
    }

}
