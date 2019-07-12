const stopIdInput = document.querySelector(`#stopId`);
const divResult = document.querySelector(`#stopName`);
const ulBuses = document.querySelector(`#buses`);
const baseUrl = `https://judgetests.firebaseio.com/businfo`;

function getInfo() {
    console.log("TODO...");
    const endPOint = `/` + stopIdInput.value + `.json`;
    const totalUrl = baseUrl + endPOint;

    fetch(totalUrl)
        .then(res => res.json())
        .then(busStops => {
            const nameOfStop = busStops.name;
            const buses = Object.entries(busStops.buses);

            // debugger;
            divResult.textContent = nameOfStop;
            buses.forEach(busInfo => {
                const liItem = createLiInfo(busInfo);
                ulBuses.appendChild(liItem);
            })
        })
        .catch((er) => divResult.textContent=`Error`);


    clearInputField();

    function createLiInfo(busInfo) {
        const [number, time] = busInfo;
        // debugger
        const li = document.createElement(`li`);
        li.textContent = `Bus ${number} arrives in ${time}`;
        return li;
    }
    function clearInputField() {
        stopIdInput.value = ``;
    }
}