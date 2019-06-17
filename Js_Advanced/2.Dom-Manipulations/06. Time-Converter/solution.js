function attachEventsListeners() {
    // TODO: attach click events to all buttons
    const buttons = Array.from(document.querySelectorAll(`[type="button"]`));
    buttons.forEach(b => b.addEventListener(`click`, convertDates))

    const daysInput = document.getElementById(`days`);
    const hoursInput = document.getElementById(`hours`);
    const minutesInput = document.getElementById(`minutes`);
    const secondsInput = document.getElementById(`seconds`);



    function convertDates(e) {

        const currentBtn = e.target;
        let currentId = currentBtn.id;
        let currentValue = Array.from(currentBtn.parentNode.children)[1].value;

        currentId = currentId.replace(`Btn`, ``);

        switch (currentId) {
            case `days`:

                hoursInput.value = currentValue * 24;
                minutesInput.value = hoursInput.value * 60;
                secondsInput.value = minutesInput.value * 60;
                break;

            case `hours`:
                daysInput.value = currentValue / 24;

                minutesInput.value = +currentValue * 60;
                secondsInput.value = +minutesInput.value * 60;
                break;
            case `minutes`:
                hoursInput.value = currentValue / 60;
                daysInput.value = hoursInput.value / 24;

                secondsInput.value = +currentValue * 60;
                break;
            case `seconds`:

                minutesInput.value = currentValue / 60;
                hoursInput.value = minutesInput.value / 60;
                daysInput.value = hoursInput.value / 24;
                break;
        }
    }
}
