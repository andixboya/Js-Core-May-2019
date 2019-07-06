function addProduct() {

    const totalTd=document.querySelector(`tfoot tr td:nth-child(2)`);
    const productList= document.querySelector(`#product-list`)
    const textInput = document.querySelector(`input[type="text"]`);
    const numberInput = document.querySelector(`input[type="number"]`)
    

    const productName = textInput.value;
    const price = Number(numberInput.value);

    // debugger
    if (isValid(productName,price)) {
        const trToAdd = document.createElement(`tr`);
        const tdProductName = document.createElement(`td`);
        const tdPrice=document.createElement(`td`);
        
        tdProductName.textContent = productName;
        tdPrice.textContent=price;
        
        trToAdd.appendChild(tdProductName);
        trToAdd.appendChild(tdPrice);
        productList.appendChild(trToAdd);
    
        totalTd.textContent= Number(totalTd.textContent)+price;    
    }

    

    clearFields();

    function clearFields() {
        textInput.value=``;
        numberInput.value=``;
    }
    function isValid(productName,price) {
        return productName && price && price>0;
    }
}