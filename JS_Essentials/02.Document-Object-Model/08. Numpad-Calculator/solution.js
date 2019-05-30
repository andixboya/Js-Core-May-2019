function solve() {

    let buttons = Array.from(document.getElementsByTagName(`button`));
    buttons.forEach(b => b.addEventListener(`click`, calculate));
    let mathSigns = [`+`, `-`, `/`, `*`];
    let formulas = {
        [`+`]: function (a, b) {
            return a + b
        },
        [`-`]: function (a, b) {
            return a - b
        },
        [`*`]: function (a, b) {
            return a * b
        },
        [`/`]: function (a, b) {
            return a / b
        },
    }

    function calculate(e) {
        let currentButton = e.currentTarget;
        let resultOutput = document.getElementById(`resultOutput`);
        let expressionOutput = document.getElementById(`expressionOutput`);


        let text = expressionOutput.textContent;
        let symbol = currentButton.value;
        let pattern = /^(\d+(\.\d+)?) ([-+\/*]) (\d+(.\d+)?)$/;


        if (symbol === `Clear`) {
            resultOutput.textContent = ``;
            expressionOutput.textContent = ``;

        } else if (symbol === `=`) {

            let match = pattern.exec(text);
            if (match){
                let leftOperand=+match[1];
                let operator=match[3];
                let rightOperand=+match[4];
                let formula=formulas[operator];

                if (rightOperand===0){
                    resultOutput.textContent=`NaN`;

                } else {
                    resultOutput.textContent=formula(leftOperand,rightOperand);
                }
            } else {
                resultOutput.textContent=`NaN`;
            }

        }
        else {

            if (mathSigns.includes(symbol)) {
                expressionOutput.textContent += ` ${symbol} `;
            } else {
                expressionOutput.textContent += symbol;
            }


        }
    }

}