function solve() {

    let typeToCount = {};
    let output= [];

    for (const key in arguments) {

        let type = typeof (arguments[key]);

        output.push(`${type}: ${arguments[key]}`);
        if (!typeToCount.hasOwnProperty(type)) {
            typeToCount[type] = 1;
        } else {
            typeToCount[type]++;
        }

    }
    let kvps = Object.entries(typeToCount);

    kvps = kvps.sort((a, b) => b[1] - a[1]);
    let collection=[];
    collection.push(...output);
    let messages= kvps.map(kvp=> `${kvp[0]} = ${kvp[1]}`);
    collection.push(...messages);
    collection.forEach(i=> console.log(i))
}

// solve(
//     'cat', 42, function () { console.log('Hello world!'); }
// )