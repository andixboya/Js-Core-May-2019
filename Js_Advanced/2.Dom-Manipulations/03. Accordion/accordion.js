function toggle() {
    
    const textParagraph = document.getElementById(`extra`)
    

    const divSpanButton= document.querySelector(`.button`);

    if (textParagraph.style.display === `none`) {
        textParagraph.style.display=`block`;
        divSpanButton.textContent=`Less`;
    } else {
        textParagraph.style.display=`none`;
        divSpanButton.textContent=`More`;
    }

}