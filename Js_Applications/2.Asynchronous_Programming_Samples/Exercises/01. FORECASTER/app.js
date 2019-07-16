function attachEvents() {

    const constants = {
        requestDiv: document.querySelector(`#request`),
        locationInput: document.querySelector(`#location`),
        submitBtn: document.querySelector(`#submit`),
        forecastDiv: document.querySelector(`#forecast`),
        currentForecastDiv: document.querySelector(`#current`),
        upcomingForecastDiv: document.querySelector(`#upcoming`)
    }

    const validSigns = {
        Sunny: `☀`,
        'Partly sunny': `⛅`,
        Overcast: `☁`,
        Rain: `☂`,
        Degrees: `°`
    }

    let codeToNameDictionary = {};
    constants.submitBtn.addEventListener(`click`, getForecast);


    //for getting the initial data, we need 
    fetch(`https://judgetests.firebaseio.com/locations.json`)
        .then(handleRequest)
        .then((typesOfWeather) => {

            //note: this made me sweat... :/ 
            const codeToNamesObjects = Object.values(typesOfWeather);


            codeToNameDictionary = codeToNamesObjects.reduce((acc, cur) => {
                const [code, name] = Object.values(cur);
                acc[name] = code;
                return acc;
            }, {});

        })



    function getForecast() {

        const location = constants.locationInput.value;
        let code = codeToNameDictionary[location];

        
        fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
            .then(handleRequest)
            .then(currentForecast => {
                createCurrentForecast(currentForecast);
            });


            fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(handleRequest)
            .then(weatherInfo => {
                createUpcomingForecasts(weatherInfo);
            })
    }

    function createCurrentForecast(currentForecast) {

        constants.forecastDiv.style.display = `block`;
        constants.currentForecastDiv.innerHTML = ``;


        const { condition, high, low } = currentForecast.forecast;

        const currentWeatherSymbol = validSigns[condition];
        const degree = validSigns[`Degrees`];

        //note: here ... time was wasted..

        // debugger;
        const tempData = low + degree + `/` + high + degree;


        const fragment = document.createDocumentFragment();

        const divContainer = generateHtmlElement(`div`, `forecasts`, null);
        const spanConditionSymbol = generateHtmlElement(`span`, `condition symbol`, currentWeatherSymbol);
        const spanContainer = generateHtmlElement(`span`, `condition`);

        const spanForecastDataTowns = generateHtmlElement(`span`, `forecast-data`, currentForecast.name);
        const spanForecastDataTemp = generateHtmlElement(`span`, `forecast-data`, tempData);
        const spanForecastDataWeather = generateHtmlElement(`span`, `forecast-data`, condition);

        divContainer.appendChild(spanConditionSymbol);

        spanContainer.appendChild(spanForecastDataTowns);
        spanContainer.appendChild(spanForecastDataTemp);
        spanContainer.appendChild(spanForecastDataWeather);

        divContainer.appendChild(spanContainer);

        fragment.appendChild(divContainer);

        constants.currentForecastDiv.appendChild(fragment);
        // debugger;
    }
    function createUpcomingForecasts(weatherInfo) {
        constants.upcomingForecastDiv.innerHTML = ``;
        constants.upcomingForecastDiv.style.display = `block`;

        const { forecast, name } = weatherInfo;

        forecast.forEach(singleForecast => {
            const { condition, high, low } = singleForecast;

            const conditionSymbol = validSigns[condition];
            // debugger;
            const degreeSign = validSigns[`Degrees`];

            const tempData = low + degreeSign + "/" + high + degreeSign;


            const fragment = document.createDocumentFragment();

            const spanContainer = generateHtmlElement(`span`, `upcoming`);
            const spanSymbol = generateHtmlElement(`span`, `symbol`, conditionSymbol);
            const spanTempData = generateHtmlElement(`span`, `forecast-data`, tempData);
            const spanCondition = generateHtmlElement(`span`, `forecast-data`, condition);

            spanContainer.appendChild(spanSymbol);
            spanContainer.appendChild(spanTempData);
            spanContainer.appendChild(spanCondition);


            fragment.appendChild(spanContainer);
            constants.upcomingForecastDiv.appendChild(fragment);

        })

        // debugger;
    }

    //important => add as many as possible params, you don`t have to use them all!
    function generateHtmlElement(tagName, className, textToAdd) {
        // debugger;
        const element = document.createElement(tagName);
        const classList = className.split(` `);

        //note: important issue here! (can not accept multiple classes with space)!
        if (className) {
            element.classList.add(...classList);
        }
        if (textToAdd) {
            element.textContent = textToAdd;
        }
        return element;
    }

    function handleRequest(res) {
        console.log(res);
        const statusCode = res.status;

        debugger;
        if (statusCode >= 400 || !statusCode) {
            throw new Error(`Error`);
        } else {
            return res.json();
        }
    }

}

attachEvents();