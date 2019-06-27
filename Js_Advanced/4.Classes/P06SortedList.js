class List {

    constructor() {
        this.numbers = [];
        this.size=0;
    }


    add(element) {
        if (Number.isInteger(element)) {
            this.numbers.push(+element);
            this.numbers.sort((a, b) => a - b);
            this.size++;
        }
    }
    remove(index) {
        if (index >= 0 && index < this.numbers.length) {
            this.numbers.splice(index,1);
            this.size--;
        } else{
            console.log(`Index out of range error!`);
        }

    }
    get(index) {
        if (index >= 0 && index < this.numbers.length) {
            return this.numbers[index];
        } else{
            console.log(`Index out of range error!`);
        }
    }
    
    // get size(){
    //     return this._size;
    // }
    //getter for the size of the function
}


// let sample= new List();
// console.log(sample.size);
// sample.add(3);
// sample.add(5);
// sample.add(1);
// sample.add(0);
// console.log(sample.length);
// console.log(sample.numbers);
// sample.remove(3);
// console.log(sample.numbers);
// sample.remove(1);
// console.log(sample.numbers);
// console.log(sample.get(0));