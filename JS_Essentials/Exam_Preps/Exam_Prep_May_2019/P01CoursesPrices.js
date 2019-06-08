function solve(first, second, third, typeOfEducation) {

    let firstDiscount = 180 * 0.1;
    let secondDiscount = 0
    let thirdDiscount = 0

    let firstCourse = 170;
    let secondCourse = 180;
    let thirdCourse = 190;

    let totalPrice = 0;


    if (first) {
        totalPrice += firstCourse
    }
    if (second) {
        totalPrice += secondCourse;
        if (first) {
            totalPrice -= firstDiscount;
        }

    }
    if (third) {
        totalPrice += thirdCourse;
        if (first && second) {
            secondDiscount = totalPrice * 0.06;
            totalPrice -= secondDiscount;
        }
    }
    if (typeOfEducation === `online`) {
        thirdDiscount = totalPrice * 0.06;
        totalPrice -= thirdDiscount;
    }

    totalPrice = Math.round(totalPrice);
    console.log(totalPrice);
}
solve(
    true, false, false, "onsite"
);