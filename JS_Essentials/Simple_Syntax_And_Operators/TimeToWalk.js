function solve(steps,lengthInMeters,speedKmH) {
    
    //break for 1 min every 500
    let meters= steps*lengthInMeters;
    let metersPerSecond= speedKmH/3.6;
    let additionalSeconds= Math.floor(meters/500);
    let time=(meters/metersPerSecond+additionalSeconds*60).toFixed(0);

    let minutes= Math.floor(time/60);
    let hours= Math.floor(time/3600);
    let seconds=time%60;

    minutes= minutes<9 ? `0${minutes}` : minutes;
    hours= hours<9? `0${hours}` : hours;
    seconds = seconds<9? `0${seconds}`: seconds;

    let message= `${hours}:${minutes}:${seconds}`;
    console.log(message);
}
solve(
    2564, 0.70, 5.5
)