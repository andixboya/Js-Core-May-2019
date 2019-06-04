function solve(input) {
    
    input.sort( (a,b)=> {
        return (a.length-b.length) || (a.localeCompare(b));
    })


    console.log(input.join(`\n`));
    // first solution?
    //let result = a.length- b.length;
    // if (result!==0) {
    //     return result;
    // } else{
    //     result=a.localeCompare(b);
    //     return result;
    // }

}
