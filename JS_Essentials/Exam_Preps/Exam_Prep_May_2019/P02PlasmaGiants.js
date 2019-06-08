function solve(arr, sizeOfCut) {

    const length = arr.length / 2;
    let firstArr = arr.slice(0, length);
    let secondArr = arr.slice(length);

    let hpOfFirst = 0;
    let hpOfSecond = 0;
    const dmgPerHit = Math.min(...arr);
    const minHealthBar = Math.max(...arr);

    let countOfRounds = 1;

    if (sizeOfCut == 0) {
        hpOfFirst = firstArr.reduce((a, b) => a * b);
        hpOfSecond = secondArr.reduce((a, b) => a * b);
    }

    while (firstArr.length > 0 && sizeOfCut > 0) {
        const current = firstArr.splice(0, sizeOfCut);
        hpOfFirst += current.reduce((a, b) => a * b);
        const secondCurrent = secondArr.splice(0, sizeOfCut);
        hpOfSecond += secondCurrent.reduce((a, b) => a * b);
    }

    //theoretically they will always have the same length (according to the description of the exercise...)
    // while (secondArr.length > 0 && sizeOfCut > 0) {
    //     const secondCurrent = secondArr.splice(0, sizeOfCut);
    //     hpOfSecond += secondCurrent.reduce((a, b) => a * b);
    // }
    if (dmgPerHit != 0) {

        while (hpOfFirst > minHealthBar && hpOfSecond > minHealthBar) {
            hpOfFirst -= dmgPerHit;
            hpOfSecond -= dmgPerHit;
            countOfRounds++;
        }

    }

    if (hpOfFirst === hpOfSecond) {
        console.log(`Its a draw ${hpOfFirst} - ${hpOfSecond}`)
    } else if (hpOfFirst > hpOfSecond) {
        console.log(`First Giant defeated Second Giant with result ${hpOfFirst} - ${hpOfSecond} in ${countOfRounds} rounds`);
    } else if (hpOfSecond > hpOfFirst) {
        console.log(`Second Giant defeated First Giant with result ${hpOfSecond} - ${hpOfFirst} in ${countOfRounds} rounds`);
    }

}