class Stringer {
    constructor(string, initLength) {
        this.innerString = string,
        this.innerLength = initLength
    }

    decrease(value) {
        if (this.innerLength - value < 0) {
            this.innerLength = 0;
        } else {
            this.innerLength -= value;
        }

    }
    increase(value) {
        this.innerLength += value;
    }

    toString() {
        let arr = this.innerString.split(``);
        let result = arr.slice(0, this.innerLength).join(``);
        if (result.length < this.innerString.length) {
            result += `...`;
        }
        return result;
    }

}

// let test = new Stringer("Test", 5);
// console.log(test.toString()); //Test

// test.decrease(3);
// console.log(test.toString()); //Te...

// test.decrease(5);
// console.log(test.toString()); //...

// test.increase(4);
// console.log(test.toString()); //Test