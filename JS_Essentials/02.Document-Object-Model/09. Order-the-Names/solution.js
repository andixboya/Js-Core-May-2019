function solve() {


    let liElements = document.getElementsByTagName(`li`);
    let button = document.getElementsByTagName(`button`)[0];
    button.addEventListener(`click`, addNames);

    function addNames() {
        let text = document.getElementsByTagName(`input`)[0].value.toLowerCase();

        let firstLetter = text[0].toUpperCase();
        let name= firstLetter+ [...text].splice(1).join(``);

        let index = firstLetter.charCodeAt(0)-65;
        let line= liElements[index];
        let names= line.textContent.split(`, `).filter(x=> x);
        names.push(name);
        line.textContent=names.join(`, `);

        document.getElementsByTagName('input')[0].value = '';
    }

    // function fillInDictionary(dictionary) {
    //     let counter = 0;
    //     for (let i = 65; i <= 90; i++) {
    //         let symbol = String.fromCharCode(i);
    //         dictionary[symbol] = [];
    //         if (symbol === `P`) {
    //             liElements[counter].textContent = [`Peterson`];
    //         } else if (symbol === `N`) {
    //             liElements[counter].textContent = [`Nixon`];
    //         }
    //         fillInCurrentLetter(i, symbol);
    //         counter++;
    //     }
    //
    //     function fillInCurrentLetter(i, letter) {
    //         letterToNumber[letter] = i - 65;
    //     }
    //
    //     return dictionary;
    // }

    // function fillInList() {
    //     for (let el of Object.keys(dictionary)) {
    //         let index = letterToNumber[el];
    //         liElements[index].textContent = dictionary[el].join(`, `)
    //     }
    //
    // }
}