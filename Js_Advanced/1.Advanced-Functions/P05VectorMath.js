let solution= (function solve() {
    
    function add() {
        
        let [x1,y1]=arguments [0];
        let [x2,y2]=arguments[1];
        return [x1+x2,y1+y2];
    }
    function multiply( ) {
        
        let [x1,y1]=arguments[0]
        let multiplier=arguments[1];
        return [x1*multiplier,y1*multiplier]

    }
    function length() {
        let [x1,y1]=arguments[0]
        return Math.sqrt( x1*x1 + y1*y1);
    }
    function dot() {

        let [x1,y1]=arguments[0];
        let [x2,y2]= arguments[1];
        return x1*x2+y1*y2;
    }
    function cross() {
        
        let [x1,y1]=arguments[0];
        let[x2,y2]=arguments[1];
        return x1*y2 - y1*x2;
    }

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }
})();
// console.log(solution.add([1, 1], [1, 0]));
// console.log(solution.multiply([3.5, -2], 2));
// console.log(solution.length([3, -4]));
// console.log(solution.dot([1, 0], [0, -1]));
// console.log(solution.cross([3, 7], [1, 0]));