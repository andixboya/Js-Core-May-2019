function solve() {

    const baseUrl = `https://judgetests.firebaseio.com/schedule/`;
    let currentUrl = `https://judgetests.firebaseio.com/schedule/depot.json`;

    const scheduleDiv = document.querySelector(`#schedule`);
    const spanInfo = document.querySelector(`span[class="info"]`);
    let nextStop = `depot`;

    const departBtn = document.querySelector(`#depart`);
    const arriveBtn = document.querySelector(`#arrive`);


    function depart() {

        fetch(currentUrl)
            .then((res) => res.json())
            .then((busInfo) => {
                const { name, next } = busInfo;

                currentUrl = baseUrl + next + ".json";
                // debugger
                spanInfo.textContent = `Next stop ${name}`;

                toggleButtons(departBtn,arriveBtn);
            })
            // .catch((er)=> toggleBtn(departBtn));
            //even the catch block is unnecessary;
    }

    function arrive() {
        let stop = spanInfo.textContent.split(`Next stop`)[1];
        spanInfo.textContent = `Arriving at ${stop}`;
        // debugger
        toggleButtons(arriveBtn,departBtn);
        
    }

    return {
        depart,
        arrive
    };


    function toggleButtons(onButton,offButton) {

        let isOn = onButton.getAttribute(`disabled`);
        // debugger
        if (!isOn) {
            onButton.setAttribute(`disabled`, true);
            offButton.removeAttribute('disabled')
        } else {
            onButton.removeAttribute(`disabled`);
            offButton.setAttribute(`disabled`,true);
        }
    }
}

let result = solve();