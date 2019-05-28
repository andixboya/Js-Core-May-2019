function solve(arr) {


    let numberInput = +arr.shift();
    let result = numberInput;



    for (const command of arr) {

        switch (command) {
            case `chop`:
                chop();
                break;

            case `dice`:
                dice();
                break;
            case `spice`:
                spice();
                break;
            case `bake`:
                bake();
                break;
            case `fillet`:
                fillet();
                break;

        }
    }

    

    function chop() {

        result /= 2;
        console.log(result);
    }

    function dice() {

        result = Math.sqrt(result);
        console.log(result);
    }

    function spice() {

        result++;
        console.log(result);
    }

    function bake() {

        result *= 3;
        console.log(result);
    }

    function fillet() {

        result *= 0.8;
        console.log(result);
    }


}

solve(
    ['9', 'dice', 'spice', 'chop', 'bake', 'fillet']
)