function solve() {

    let buttons = document.getElementsByTagName(`button`);
    let generateButton = buttons[0];
    let buyButton = buttons[1];

    let checkboxes= Array.from(document.querySelectorAll(`[type="checkbox"]`));
    checkboxes.forEach(c=> c.disabled=false);


    let tBody=document.getElementsByTagName(`tbody`)[0];

    buyButton.addEventListener(`click`, buy);
    generateButton.addEventListener(`click`, generateFurniture);


    function buy() {

        let checkboxes= Array.from(document.querySelectorAll(`[type="checkbox"]`));
        let trObjects=checkboxes
            .map(c=> c.parentNode.parentNode)
            .filter(o=> o.children[4].children[0].checked===true);

        let textArea=document.getElementsByTagName(`textarea`)[1];

        if (trObjects.length>0){

            textArea.disabled=false;
            let namesOfObjects=trObjects.map(o=> o.children[1].children[0].textContent);
            let totalPrice=trObjects
                .map(o=> Number(o.children[2].children[0].textContent))
                .reduce((a,b)=> a+b)
                .toFixed(2);

            let decorationFactors=trObjects
                .map(o=> Number(o.children[3].children[0].textContent));
            let averageDecFactor=(decorationFactors.reduce((a,b)=> a+b) / decorationFactors.length);

            textArea.value+=`Bought furniture: ${namesOfObjects.join(`, `)}\n`;
            textArea.value+=`Total price: ${totalPrice}\n`;
            textArea.value+=`Average decoration factor: ${averageDecFactor}`;
            textArea.disabled=true;
        }

    }

    function generateFurniture() {
        let input = document.querySelector(`textarea`);
        let text = input.value;

        let objects = JSON.parse(text);

        objects.forEach(o => generateObj(o));

        function generateObj(o) {
            let tr = document.createElement(`tr`);

            let imgEl = document.createElement(`img`);
            imgEl.setAttribute(`src`, o.img);
            tr.appendChild(generateData(imgEl));


            let pName=generateP(o.name);
            tr.appendChild(generateData(pName));

            let pPrice=generateP(o.price);
            tr.appendChild(generateData(pPrice));

            let pDec=generateP(o.decFactor);
            tr.appendChild(generateData(pDec));

            let checkBox=document.createElement(`INPUT`);
            checkBox.setAttribute(`type`,`checkbox`);
            tr.appendChild(generateData(checkBox));

            tBody.appendChild(tr);
        }



    }

    function generateData(info) {
        let td = document.createElement(`td`);
        td.appendChild(info);
        return td;
    }
    function generateP(info) {
        let p=document.createElement(`p`);
        p.innerHTML=info;
        return p;

    }

}