function addItem() {
    let newTextInput=document.getElementById(`newItemText`);
    let newValueInput=document.getElementById(`newItemValue`);

    const selectMenu= document.getElementById(`menu`);
    const option=document.createElement(`option`);
    option.value=newValueInput.value;
    option.text=newTextInput.value;
    selectMenu.add(option);
    

    newTextInput.value=""
    newValueInput.value="";
    
}