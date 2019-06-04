function solve(input) {

    let count = Number(input.pop());


    count %= input.length;


    for (let i = 1; i <= count; i++) {

        let num = input.pop();
        input.unshift(num);
    }

    console.log(input.join(` `));
}
