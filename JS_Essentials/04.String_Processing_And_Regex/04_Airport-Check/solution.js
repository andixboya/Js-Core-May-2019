function solve() {

    let strInput = document.getElementById(`string`);
    let input = strInput.value;
    let args = input.split(`,`);
    let text = args[0].trim();
    let condition = args[1].trim();
    let resultSpan = document.getElementById(`result`);

    let namesPattern = new RegExp(` (([A-Z]([A-Za-z]*)?)(-[A-Z][A-Za-z]*\\.)?-([A-Z][A-Za-z]*)?) `, 'g');
    let airportPattern = new RegExp(' ([A-Z]{3}\\/[A-Z]{3}) ', 'g');
    let flightNumberPattern = new RegExp(' ([A-Z]{1,3}\\d{1,5}) ', 'g');
    let companyPattern = new RegExp('- ([A-Z][A-Za-z]*\\*[A-Z][A-Za-z]*) ', 'g');


    let names = namesPattern.exec(text);
    let flight = flightNumberPattern.exec(text);
    let company = companyPattern.exec(text);
    let airport = airportPattern.exec(text);


    let fullName;
    let companyName;
    let flightName;
    let fromAirport;
    let toAirport;

    if (names) {
        fullName = names[1].replace(/-/g,` `);
    }

    if (company) {
        companyName = company[1];
        companyName = companyName.replace(/\*/g, ` `);
    }
    if (flight){
        flightName= flight[1];
    }
    if (airport){
        fromAirport=airport[1].split(`/`)[0];
        toAirport=airport[1].split(`/`)[1];
    }

    let message;

    switch (condition) {
        case "name":
            message = `Mr/Ms, ${fullName}, have a nice flight!`;
            break;

        case"flight":
            message = `Your flight number ${flightName} is from ${fromAirport} to ${toAirport}.`;
            break;

        case"company":
            message = `Have a nice flight with ${companyName}.`;
            break;

        case"all":
            message = `Mr/Ms, ${fullName}, your flight number ${flightName} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${companyName}.`;
            break;
    }

    resultSpan.textContent=message;
    strInput.value = ``;
}