function solve() {
    let [name, a, w, h] = arguments;
    let age = +a;
    let weight = +w;
    let height = +h;
    let heightInCm = height / 100;

    let bmi = Math.round(weight / (heightInCm ** 2));

    let status = ``;
    if (bmi < 18.5) {
        status = `underweight`

    } else if (bmi < 25) {
        status = `normal`;
    } else if (bmi < 30) {
        status = `overweight`
    } else {
        status = `obese`;
    }

    let obj = {
        name,
        personalInfo: {
            age,
            weight,
            height
        },
        BMI: bmi,
        status
    }
    if (status===`obese`) {
        obj[`recommendation`]=`admission required`;
    }

    return obj;
}
// console.log(solve(`Honey Boo Boo`, 9, 57, 137));