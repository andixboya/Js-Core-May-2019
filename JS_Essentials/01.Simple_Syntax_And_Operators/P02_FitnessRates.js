function solve(day, service, time) {

    let days = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, 'Saturday', `Sunday`];
    let weekServices = {Fitness: 5, Sauna: 4, Instructor: 10};
    let weekEndServices = {Fitness: 8, Sauna: 7, Instructor: 15};

    let index = days.indexOf(day);
    let priceOfService = 0;

    if (index <= 4) { // for mon-fri
        if (time <= 15) { // before
            priceOfService = weekServices[service];
        } else { //+2.50
            priceOfService = weekServices[service] + 2.50;
        }
    } else { // for saturday/sunday
        priceOfService = weekEndServices[service];
    }
    console.log(priceOfService);
}

solve(
    'Sunday', 'Fitness', 22.00
)