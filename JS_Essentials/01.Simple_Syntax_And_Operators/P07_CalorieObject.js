function solve(arr){

    let obj= {};
    for (let i = 0; i < arr.length; i+=2) {
        let propName=arr[i];
        let propValue=arr[i+1];
        obj[propName]=Number(propValue);
    }
    console.log(obj);
}
solve(
    ['Yoghurt', 48, 'Rise', 138, 'Apple', 52]
)