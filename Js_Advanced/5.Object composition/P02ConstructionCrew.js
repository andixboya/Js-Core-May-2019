function modifyWorker(worker) {

    if (worker.hasOwnProperty(`dizziness`)
        && worker[`dizziness`]===true){
        let sugarToAdd=0.1*worker[`weight`]*worker[`experience`];
        worker[`levelOfHydrated`]+=sugarToAdd;
        worker[`dizziness`]=false;

    }
    return worker;
}

// console.log(modifyWorker(
//     { weight: 95,
//         experience: 3,
//         levelOfHydrated: 0,
//         dizziness: false }
      
// ));