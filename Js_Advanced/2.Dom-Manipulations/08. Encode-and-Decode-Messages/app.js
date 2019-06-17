function encodeAndDecodeMessages() {

    const textAreas = Array.from(document.getElementsByTagName(`textarea`));
    const firstTextArea=textAreas[0];
    const recievedTextArea=textAreas[1];

    const buttons= Array.from(document.getElementsByTagName(`button`));

    const encodeButton= buttons[0];
    const decodeAndReadBtn=buttons[1];
    
    encodeButton.addEventListener(`click`,encode);
    decodeAndReadBtn.addEventListener(`click`,decode);

    function encode() {
        let textToEncode=firstTextArea.value;

        let newMessage='';

        [...textToEncode].forEach(l=>  {
            const currentLetter= l.charCodeAt(0)+1;
            newMessage+=String.fromCharCode(currentLetter);
        } );
        firstTextArea.value=``;
        recievedTextArea.textContent=newMessage;
    }

    function decode() {
        recievedTextArea.setAttribute(`disabled`,false);
        
        let textToDecode=recievedTextArea.textContent;
        let newMessage='';
        [...textToDecode].forEach(l=> {
            const currentLetter=l.charCodeAt(0)-1;
            newMessage+=String.fromCharCode(currentLetter);
        })
        recievedTextArea.textContent=newMessage;

        recievedTextArea.setAttribute(`disabled`,true);
    }
}