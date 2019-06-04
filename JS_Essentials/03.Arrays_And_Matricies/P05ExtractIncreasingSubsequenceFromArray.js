function solve(input){

    let minNum=Number.MIN_SAFE_INTEGER;

    let nums=[];
    for (let i = 0; i < input.length; i++) {
        
        const num = input[i];

        if (num>=minNum) {
            nums.push(num);
            minNum=num;
        }
    }
    console.log(nums.join(`\n`));

}
