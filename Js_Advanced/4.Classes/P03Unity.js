class Rat {
    constructor(name) {
        this.name = name;
        this.unitedRats = [];
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this.unitedRats.push(otherRat);
        }

    }
    getRats() {
        
        let result=this.unitedRats.map(r=> JSON.stringify(r));
        return result
    }

    toString() {
        let message = this.name;
        if (this.unitedRats.length > 0) {
            message += `\n` + this.unitedRats.map(r => `##${r.name}`).join(`\n`);
        }
        return message;
    }

}

let test = new Rat("Pesho");
console.log(test.toString()); //Pesho

console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho
