function subtract() {
    const divResult= document.getElementById(`result`);
    let numbers= document.getElementsByTagName(`input`).toArray()
    .map(i=> Number(i.value));
    
    const result=numbers[0]-numbers[1];
    divResult.textContent=result;
}