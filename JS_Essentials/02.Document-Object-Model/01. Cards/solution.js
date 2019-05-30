function solve() {

    let cardElements = document.querySelectorAll(`[src="images/card.jpg"]`);

    for (let c of cardElements) {
        c.addEventListener(`click`, click);
    }

    let firstCardValue;
    let firstCard;
    let secondCardValue;
    let secondCard;
    let firstResultSpan = document.getElementsByTagName(`span`)[0];
    let secondResultSpan = document.getElementsByTagName(`span`)[2];


    function click(e) {
        let currentCard = e.currentTarget;
        let currentParentId = currentCard.parentNode.id;

        if (firstResultSpan.textContent && secondResultSpan.textContent) {
            firstResultSpan.textContent = undefined;
            secondResultSpan.textContent = undefined;
        }

        if (!firstCardValue && currentParentId === `player1Div`) {
            firstCardValue = Number(currentCard.name);
            firstCard = currentCard;
            firstCard.src = `images/whiteCard.jpg`;
            firstCard.removeEventListener(`click`, click);
            firstResultSpan.textContent = firstCardValue.toString();
        } else if (!secondCardValue && currentParentId === `player2Div`) {
            secondCardValue = Number(currentCard.name);
            secondCard = currentCard;
            secondCard.src = `images/whiteCard.jpg`;
            secondCard.removeEventListener(`click`, click);
            secondResultSpan.textContent = secondCardValue.toString();

        }

        if (firstCardValue && secondCardValue) {


            if (firstCardValue > secondCardValue) {
                firstCard.style.border = `2px solid green`;
                secondCard.style.border = `2px solid red`;

            } else if (firstCardValue < secondCardValue) {
                secondCard.style.border = `2px solid green`;
                firstCard.style.border = `2px solid red`;
            }
            let historyDiv = document.getElementById(`history`);

            historyDiv.textContent += `[${firstCardValue} vs ${secondCardValue}] `;


            firstCard = undefined;
            firstCardValue = 0;
            secondCardValue = 0;
            secondCard = undefined;

        }
    }
}