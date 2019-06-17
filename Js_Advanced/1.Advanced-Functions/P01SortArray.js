function solve(arr,command) {
    function returnSortedArr(arr,command){

        function asc() {
            return (a,b)=> a-b;
        }
        function desc(){
            return (a,b)=> b-a;
        }
        let dictionary= {
            asc,
            desc
        }
        
        return arr.sort(dictionary[command]());
    }

    return returnSortedArr(arr,command);

}
// solve(
//     [14, 7, 17, 6, 8], 'desc'
// )