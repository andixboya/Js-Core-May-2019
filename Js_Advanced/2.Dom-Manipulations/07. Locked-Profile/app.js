function lockedProfile() {
    
    const buttons= Array.from( document.getElementsByTagName(`button`));
    
    buttons.forEach(b=> b.addEventListener(`click`,showMore))
    
    const switchDisplay= (div)=> {
        
        const currentDisplay=div.style.display;
        if (currentDisplay===``) {
            div.style.display=`block`;    
        } else{
            div.style.display=``;
        }
        
    }
    const isLocked = (statusOfButton)=>{

        return statusOfButton===`unlock`;
    }

    const switchText = (targetButton)=> {
        const text= targetButton.textContent;
        if (text===`Show more`) {
            targetButton.textContent=`Hide it`
        } else {
            targetButton.textContent=`Show more`;
        }
    }

    function showMore(e) {
        
        const targetButton=e.target;
        const parent= e.target.parentNode;
        const checkedButton= Array.from(parent.querySelectorAll(`[type="radio"]`)).find(b=> b.checked);
        const statusOfButton= checkedButton.getAttribute(`value`);
        


        const children= Array.from( parent.children);
        const div= children.find(c=> c.id.includes(`user`));

        
        if (isLocked(statusOfButton)) {
            switchDisplay(div);    
            switchText(targetButton);
        }
                
    }
}