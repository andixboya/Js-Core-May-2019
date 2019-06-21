// const assert= require(`chai`).assert;
// const isOddOrEven=require(`../P02EvenOrOdd.js`);

describe(`func`, function () {
    it(`should pass undefined if input is not string`, function(){

        let input=5;
        assert.isUndefined(isOddOrEven(input));
    })

    it(`should return odd/even depending on the input`, function(){

        let even= `haha`;
        let odd=`odd`;

        assert.equal(isOddOrEven(even),`even`);
        assert.equal(isOddOrEven(odd),odd);
    })

});
