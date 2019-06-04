function solve() {

    let strInput = document.getElementById(`string`);
    let textInput = document.getElementById(`text`);
    let resultSpan = document.getElementById(`result`);

    let closer = strInput.value;
    let text = textInput.value;


    let regex = /(east|north)[\w,\W]*?(\d{2})[^,]*?,[^,]*?(\d{6})/gmi;

    let east = '';
    let north = '';
    while ((m = regex.exec(text)) !== null) {
        let currentWay = m[1].toLowerCase();
        if (currentWay === `east`) {
            east = `${m[2]}.${m[3]} E`;
        } else if (currentWay === `north`) {
            north = `${m[2]}.${m[3]} N`;
        }
    }

    let pattern = `${closer}(.+?)${closer}`;
    let msgRegex = new RegExp(pattern, `gmi`);

    let message = msgRegex.exec(text)[1];
    insertParagraph(north);
    insertParagraph(east);
    insertParagraph(`Message: ${message}`);

    function insertParagraph(text) {
        let p = document.createElement(`p`);
        p.textContent = text;
        resultSpan.appendChild(p);
    }
}
