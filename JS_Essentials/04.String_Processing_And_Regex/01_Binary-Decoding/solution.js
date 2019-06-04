function solve() {

	let strInput= document.getElementById(`input`).value;
	
	let resultSpan= document.getElementById(`resultOutput`);
	
    let input = strInput
        .split(``)
        .map(Number)
        .filter(x=> x);

    let num= input.reduce((a,i)=> a+i);

    while (num.toString().length>1){
        let numAsString= num.toString();
        num= numAsString
            .split(``)
            .map(Number)
            .reduce((a,i) => a+i);
    }
	//reducing the length
	strInput= [...strInput].splice(num);
	strInput=strInput.slice(0,strInput.length-num).join(``);
	
	let binarNums= strInput.match(/\d{1,8}/g);
	

    let letters= binarNums.map(n=> {

		let decimalNum=parseInt(n,2);

		let num= String.fromCharCode(decimalNum);
        return num;
    });

	let pattern=/[A-Za-z ]/;
	let regex= new RegExp(pattern);
	
	
	let  filteredLetters=(letters.filter(l=> regex.test(l))).join(``);
    resultSpan.textContent=filteredLetters;
}