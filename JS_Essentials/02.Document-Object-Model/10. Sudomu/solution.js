function solve() {

    let buttons = document.getElementsByTagName(`button`);
    let quickCheckBtn = buttons[0];
    let clearBtn = buttons[1];
    let checkDiv = document.getElementById(`check`);
    let checkPar=checkDiv.children[0];
    let table = document.getElementsByTagName(`table`)[0];


    quickCheckBtn.addEventListener(`click`, check);
    clearBtn.addEventListener(`click`, clear);

    let trElements = Array.from(document.getElementsByTagName(`tr`)).slice(2, 5);
    let rows = trElements.map(tr => Array.from(tr.children));

    function check() {

        let validMatrix = true;
        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {

                let currentTd = +rows[i][j].children[0].value;

                if (!isValid(currentTd, i, j)) {
                    validMatrix = false;
                    break;
                }

            }

            if (validMatrix === false) {
                break;
            }
        }

        if (validMatrix) {
            checkPar.textContent = `You solve it! Congratulations!`;
            table.style.border = `2px solid green`;
            checkPar.style.color = `green`;
        } else {
            checkPar.textContent = `NOP! You are not done yet...`;
            table.style.border = `2px solid red`;
            checkPar.style.color = `red`;
        }

        function isValid(value, r, c) {

            //checking rows
            for (let i = 0; i < 3; i++) {
                let current = +rows[i][c].children[0].value;

                if (current === value && r !== i) {
                    return false;
                }
            }
            //checking columns
            for (let i = 0; i < 3; i++) {
                if (rows[r][i] === value && c !== i) {
                    return false;
                }
            }

            return true;
        }
    }

    function clear() {
        checkPar.textContent = ``;
        table.style.border = `none`;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rows[i][j].children[0].value = ``;
            }

        }
    }
}