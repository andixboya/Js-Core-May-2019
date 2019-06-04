function atmSolver(commands) {

    //insert command : inserted + totalCurrent

    //withdraw com :
    //current balance/ money to withdraw
    //error in case first<second;
    //not enough money >error
    //loop from the biggest until the withdraw is complete
    //report com:
    //count banknotes
    let coins = [];

    for (let line of commands) {

        let message=``;
        if (line.length > 2) {//insert

            let currentTotalSum = 0;
            let currentInsertedCoins = line.map(Number);
            currentInsertedCoins.forEach(c => {
                coins.push(c);
                currentTotalSum += c;
            })

            let totalBalanceOfCoins=coins.reduce((a,b)=> a+b,0);
            
            message=`Service Report: ${currentTotalSum}$ inserted. Current balance: ${totalBalanceOfCoins}$.`
        }
         else if (line.length === 2) {//withdraw
            let [balance, moneyToWithdraw] = line;
            let totalBalanceOfCoins=coins.reduce((a,b)=> a+b,0);
        
        
            if (balance < moneyToWithdraw) {
                message = `Not enough money in your account. Account balance: ${balance}$.`;
            } else if (totalBalanceOfCoins < moneyToWithdraw) {
                message = 'ATM machine is out of order!';
            } else {
                message = withdrawMoney(balance, moneyToWithdraw);
            }
            
        } else if (line.length === 1) {//report

            let valueOfCoin=+line[0];
            let countOfCoins=coins.filter(c=> c===valueOfCoin).length;

            message=`Service Report: Banknotes from ${valueOfCoin}$: ${countOfCoins}.`
        }

        console.log(message);
    }


    function withdrawMoney(accountBalance, moneyToWithdraw) {

        let message = ``;
        let moneyReceived=moneyToWithdraw;

        coins.sort((a,b)=> b-a);

        for (let c = 0; c < coins.length; c++) {
            const currentCoin = coins[c];


            if (moneyToWithdraw===0) {
                break;
            }

            if (moneyToWithdraw>=currentCoin ) {
                coins.splice(c,1);
                moneyToWithdraw-=currentCoin;
                accountBalance-=currentCoin;
                c--;
                
            }
        }

        message = `You get ${moneyReceived}$. Account balance: ${accountBalance}$. Thank you!`
        return message
    }

}