function solve(input) {
    
    let[speed,restriction]= input;
    let restrictionDic={
        motorway : 130,
        interstate : 90,
        city :50,
        residential : 20
    }

    let permitedSpeed= restrictionDic[restriction];
    let differenceInSpeed= +speed-permitedSpeed;

    if (differenceInSpeed>0) {
        

        if (differenceInSpeed<=20) {
            console.log(`speeding`);
        } else if (differenceInSpeed<=40) {
            console.log(`excessive speeding`);
        } else{
            console.log(`reckless driving`);
        }


    }

}
solve(
    [200, 'motorway']
)