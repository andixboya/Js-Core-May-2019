function solve() {

    let questionToAnswers = {
        [`Question #1: Which event occurs when the user clicks on an HTML element?`]: `onclick`,
        [`Question #2: Which function converting JSON to string?`]: `JSON.stringify()`,
        [`Question #3: What is DOM?`]: `A programming API for HTML and XML documents`
    }
    let numberQuestion = {
        [`Question #1: Which event occurs when the user clicks on an HTML element?`]: 0,
        [`Question #2: Which function converting JSON to string?`]: 1,
        [`Question #3: What is DOM?`]: 2
    }
    let sections = document.getElementsByTagName(`section`);

    let index = 0;

    let buttons = Array.from(document.querySelectorAll(`[class="answer-text"]`));
    buttons.forEach(b => b.addEventListener(`click`, slideToNext));
    let totalPoints = 0;

    function slideToNext(e) {

        let button = e.currentTarget;
        let givenAnswer = button.textContent;

        let numberOnTheList = button.parentNode.parentNode.parentNode;
        let headerQ = numberOnTheList.querySelector(`h2`);
        let currentQuestion = headerQ.textContent;
        let actualAnswer = questionToAnswers[currentQuestion];
        if (actualAnswer === givenAnswer) {
            totalPoints++;
        }

        index = numberQuestion[currentQuestion];
        let isGameOver = index === sections.length - 1;

        if (isGameOver) {
            shutDownCurrentSlide(index);

            let el = document.getElementById(`results`);
            el.style.display = `block`;
            let resultDiv = document.querySelector(`#results li h1`);



            if (totalPoints === 3) {
                resultDiv.textContent = `You are recognized as top JavaScript fan!`;
            } else {
                resultDiv.textContent = `You have ${totalPoints} right answers`;
            }
            return;
        }

        changeSlide(index);

        function changeSlide(index) {
            sections[index].style.display = `none`;
            sections[index + 1].style.display = `block`;
        }
        function shutDownCurrentSlide(index) {
            sections[index].style.display = `none`;

        }

    }


}
