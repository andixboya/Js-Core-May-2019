function solve(input){
let stringNumber= input.toString();
let first=stringNumber[0];
let sum= [...stringNumber]
    .map(Number)
    .reduce((a,b)=> a+b);

    let isTrue=true;
    for (let i = 1; i <stringNumber.length ; i++) {
        if (first!==stringNumber[i]){
            isTrue=false;
            break;
        }
    }
    console.log(isTrue);
    console.log(sum);
}
solve(1234);