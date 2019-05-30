function solve() {

    let button=document.querySelector(`#send`);
    button.addEventListener(`click`,click);

    function click() {
        let chatMessage= document.querySelector(`div #chat_messages`);
        let messageDiv= document.querySelector(`#chat_input`);
        let writtenText= messageDiv.value;

        if (writtenText){
            let divOutput= document.createElement(`div`);
            divOutput.textContent=writtenText;
            divOutput.setAttribute(`class`,`message my-message`);
            chatMessage.appendChild(divOutput);
            messageDiv.value=``;
        }

    }
}


