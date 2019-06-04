function solve() {

    let arrInput = document.getElementById(`array`);
    let resultSpan= document.getElementById(`result`);
    let arr = JSON.parse(arrInput.value);

    let specialWord = arr.shift();
    // one dasah missed before s ?
    let pattern = new RegExp(`(${specialWord})(\\s)+([!%$#A-Z]{8,})(\\s|\\.|,|$)`, `ig`);

    for (let i = 0; i < arr.length; i++) {

        let currentText = arr[i];

        let match = pattern.exec(currentText);

        while (match) {
            let keyWord = match[3];

            if (keyWord.toUpperCase()!==keyWord){

                match = pattern.exec(currentText);
                continue;
            }


            keyWord = replaceSymbols(keyWord);
            let message = match[1] + match[2] + keyWord + match[4];
            arr[i]= arr[i].replace(match[0],message);
            match = pattern.exec(currentText);

        }
        let p = document.createElement(`p`);
        p.textContent=arr[i];
        resultSpan.appendChild(p);
    }

    //redundant because i did not read the task carefully enough :((((
    function switchCaseOfWord(keyword){

        let letters= keyword.split(``);

        for (let i = 0; i < letters.length; i++) {
            let currentLetter= letters[i];
            let currentValue= currentLetter.charCodeAt(0);

            if (65<=currentValue && currentValue<=90){
                currentLetter= currentLetter.toLowerCase();
            } else if (97<=currentValue&& currentValue<=122) {
                currentLetter= currentLetter.toUpperCase();
            }
            letters[i]=currentLetter;
        }
        return letters.join(``);
    }
    function replaceSymbols(word) {

        let symbolToReplace = '!';

        let index = word.indexOf(symbolToReplace);
        while (index !== -1) {
            word = word.replace(symbolToReplace, `1`);
            index = word.indexOf(symbolToReplace);
        }
        symbolToReplace = `%`;
        index = word.indexOf(symbolToReplace);
        while (index !== -1) {
            word = word.replace(symbolToReplace, `2`);
            index = word.indexOf(symbolToReplace);
        }
        symbolToReplace = `#`;
        index = word.indexOf(symbolToReplace);
        while (index !== -1) {
            word = word.replace(symbolToReplace, `3`);
            index = word.indexOf(symbolToReplace);
        }
        symbolToReplace = `$`;
        index = word.indexOf(symbolToReplace);
        while (index !== -1) {
            word = word.replace(symbolToReplace, `4`);
            index = word.indexOf(symbolToReplace);
        }
        return word.toLowerCase();
    }
}