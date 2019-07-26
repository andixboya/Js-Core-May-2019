const elements = {
    appId: "kid_BJ_Ke8hZg",
    user: `guest`,
    password: `pass`,

    baseUrl: `https://baas.kinvey.com/`,

    getBtn: document.querySelector(`#getVenues`),

    venueDateInput: document.querySelector(`#venueDate`),

    venueInfoDiv: document.querySelector(`#venue-info`)

}

elements.getBtn.addEventListener(`click`, listVenues)

function listVenues() {
    
    elements.venueInfoDiv.innerHTML = ``;
    const date = elements.venueDateInput.value;

    const getVenueDatesUrl = elements.baseUrl + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`;
    console.log(getVenueDatesUrl);
    debugger

    fetch(getVenueDatesUrl, {
        method: `POST`,
        credentials: `include`,
        Authorization: `Basic ${btoa(elements.user + ":" + elements.password)}`,
        headers: {
            "Content-type": "application/json"
        },
        //no object! is necessary!
        // body: JSON.stringify({ date: date })
    })
        .then(handleRequest)
        .then(async validVenueIds => {

            console.log(validVenueIds);
            // debugger;
            const getUrl = elements.baseUrl + `appdata/${elements.appId}/venues`;

            // debugger;
            const res = await fetch(getUrl, {
                credentials: `include`,
                Authorization: `Base ${elements.user + ":" + elements.password}`
            });
            const currentObj = await res.json();
            // console.log(currentObj);

            const selectedVenues = currentObj.filter(o => validVenueIds.includes(o._id));

            const fragment = document.createDocumentFragment();
            selectedVenues.forEach(venue => {

                const divToAdd = generateVenueDiv(venue);
                fragment.appendChild(divToAdd);
            })

            elements.venueInfoDiv.appendChild(fragment);

        })
        .catch(er => console.log(er));
}

function handleRequest(res) {
    return res.json();
}

function generateVenueDiv(venue) {

    // console.log(venue);

    const newDiv = document.createElement(`div`);
    newDiv.classList.add(`venue`);

    const { _id, name, description, startingHour, price } = venue;

    newDiv.id = _id;
    newDiv.innerHTML = `<span class="venue-name"><input class="info" type="button" value="More info">${name}</span>
    <div class="venue-details" style="display: none;">
        <table>
            <tr>
                <th>Ticket Price</th>
                <th>Quantity</th>
                <th></th>
            </tr>
            <tr>
                <td class="venue-price">${price} lv</td>
                <td><select class="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select></td>
                <td><input class="purchase" type="button" value="Purchase"></td>
            </tr>
        </table>
        <span class="head">Venue description:</span>
        <p class="description">${description}</p>
        <p class="description">Starting time: ${startingHour}</p>
    </div>`

    const moreInfoBtn = newDiv.querySelector(`input.info`);
    moreInfoBtn.addEventListener(`click`, toggle)

    const purchaseBtn = newDiv.querySelector(`input.purchase`);
    purchaseBtn.addEventListener(`click`, purchase)
    // debugger;

    return newDiv;
}

// function generateConfirmationForm() {

// }

function toggle(e) {
    const target = e.target.parentNode.parentNode;
    const divToDisplay = target.querySelector(`div.venue-details`)
    console.log(divToDisplay);
    // debugger;
    let attribute = divToDisplay.style.display;

    // debugger;
    if (attribute == `none`) {
        divToDisplay.style.display = `block`;
    } else {
        divToDisplay.style.display = `none`;
    }


}
function purchase(e) {
    const target = e.target.parentNode.parentNode;
    console.log(target);
    const price = Number(target.querySelector(`td.venue-price`).textContent.split(` `)[0]);
    const selectElement = target.querySelector(`td .quantity`);
    const quantity = Number(selectElement.options[selectElement.selectedIndex].textContent);
    const table = target.parentNode.parentNode.parentNode;
    
    //we get the div, so we can transfer the id!
    const divContainer=table.parentNode;
    const venueId=divContainer.id;
    // console.log(venueId);
    // debugger;
    const [namePar, startingTimePar] = Array.from(table.querySelectorAll(`p.description`));
    console.log(table);

    const name = namePar.textContent;
    let start = startingTimePar.textContent;

    // debugger;
    redirectToSubmitForm(name, price, quantity, venueId);

}

function redirectToSubmitForm(name, price, quantity, venueId) {

    elements.venueInfoDiv.innerHTML = ``;
    const fragment= generateSubmitForm(name, price,quantity,venueId);
    elements.venueInfoDiv.appendChild(fragment);
}

function generateSubmitForm(name, price,qty,venueId) {

    const fragment = document.createDocumentFragment();

    const spanSubmit = document.createElement(`span`);
    spanSubmit.classList.add(`head`);
    spanSubmit.textContent = `Confirm purchase`;
    fragment.appendChild(spanSubmit);

    const divPurchaseInfo = document.createElement(`div`);
    divPurchaseInfo.id=venueId;
    divPurchaseInfo.classList.add(`purchase-info`);
    divPurchaseInfo.innerHTML = `<span>${name}</span>
    <span>${qty} x ${price}</span>
    <span>Total: ${qty * price} lv</span>
    <input type="button" value="Confirm">`
    console.log(divPurchaseInfo);
    // debugger;

    const confirmBtn= divPurchaseInfo.querySelector(`input[type="button"]`);
    confirmBtn.addEventListener(`click`,confirmReservation);
    fragment.appendChild(divPurchaseInfo);
    return fragment;
}

function confirmReservation(e) {
    const target= e.target.parentNode
    
    const venueId=target.id;
    console.log(target);
    // debugger;
    
    let [venueSpan,peopleSpan,priceSpan]=target.querySelectorAll(`span`);
 
    const [qty, price]= peopleSpan.textContent.split(` x `);
    // debugger;
    // console.log(priceSpan);
    // debugger;

    const urlForVenue=elements.baseUrl+`rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${venueId}&qty=${qty}`;

    fetch(urlForVenue,{
        method: `POST`,
        credentials:`include`,
        Authorization: `Basic ${(elements.user+":"+elements.password)}`
    })
    .then(handleRequest)
    .then(obj=> {
        const {html}=obj;
        console.log(html);
        elements.venueInfoDiv.innerHTML=html;
    });

}