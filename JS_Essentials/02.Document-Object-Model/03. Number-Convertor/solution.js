function solve() {

    let button= document.getElementsByTagName(`button`)[0];

    button.addEventListener(`click`,convert);

    let selectMenuTo= document.getElementById(`selectMenuTo`);
    selectMenuTo.add(createOption(`binary`));
    selectMenuTo.add(createOption(`hexadecimal`));

    function convert() {

        let input= document.querySelector(`#input`);
        let number= input.value;
        let select=document.querySelector(`select#selectMenuTo`);
        let format=select.options[select.selectedIndex].value;

        let result = ``;
        if (format.toLowerCase()===`hexadecimal`){
            result=(+number).toString(16).toUpperCase();
        } else if (format.toLowerCase()===`binary`){

            result=(+number).toString(2);
        }

        let resultField=document.getElementById(`result`);
        resultField.disabled=false;
        resultField.readonly=false;
        resultField.value=result;
        resultField.disabled=true;
        resultField.readonly=true;
        // input.value=``;
    }

    function createOption (text){
        let option=document.createElement(`option`);
        option.text=text;
        return option;
    }

}