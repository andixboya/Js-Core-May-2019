function create(sentences) {

   const contentDiv = document.getElementById(`content`);
   console.log(contentDiv)
   sentences.forEach(s => {
      const newDiv =document.createElement(`div`);
      const newParagraph = document.createElement(`p`);
      newParagraph.textContent=s;
      newParagraph.style.display= `none`;
      newDiv.addEventListener(`click`, onClickToggleDisplay);
      newDiv.appendChild(newParagraph);

      contentDiv.appendChild(newDiv);
   })


   function onClickToggleDisplay(e) {
      
      const children= Array.from( e.target.children);
      
      children.forEach(e=> e.style.display=`block`);
   
   }
}
