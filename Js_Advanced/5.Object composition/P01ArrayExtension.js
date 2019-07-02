(function addAditionalFunctionsToArray() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    Array.prototype.skip = function (n) {
        return this.slice(n, this.length);
    }

    Array.prototype.take = function (n) {
        if (n<0){

        }
        return this.slice(0,n);
    }
    Array.prototype.sum = function () {
        return this.reduce((a,b)=> a+b,0);
    }
    Array.prototype.average = function () {
        let sum= this.reduce((a,b)=> a+b,0);
        return sum/this.length;
    }
})()