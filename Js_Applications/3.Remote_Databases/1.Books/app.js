let constants = {
    titleInput: document.querySelector(`#title`),
    authorInput: document.querySelector(`#author`),
    isbnInput: document.querySelector(`#isbn`),


    submitBtn: document.querySelector(`form button`),
    loadBooksBtn: document.querySelector(`#loadBooks`),
    tableBody: document.querySelector(`tbody`),

    submitForm: document.querySelector(`form`),
    body: document.querySelector(`body`),



    baseUrl: `https:/baas.kinvey.com`,

    //appId or appKey
    appId: `kid_rJ2Wd8QzS`,
    appSecret: `84cd267405c64d22a3b8542f16538dd5`,
    user: `gosho`,
    password: `gosho`
}

constants.submitBtn.addEventListener(`click`, createBook);
console.log(constants.submitBtn);
constants.loadBooksBtn.addEventListener(`click`, loadAllBooks);

async function createBook(e) {

    e.preventDefault();
    const isbn = constants.isbnInput.value;
    const author = constants.authorInput.value;
    const title = constants.titleInput.value;

    const body = {
        title,
        author,
        isbn
    }

    const createUrl = constants.baseUrl + "/" + "appdata" + "/" + constants.appId + "/" + "Books";

    try {
        const res = await fetch(createUrl, {
            method: "POST",
            //apparently.... a must?
            credentials: "include",
            //a must! otherwise it will spam unotharized
            'Authorization': `Basic ${btoa(constants.user + ':' + constants.password)}`,
            //a must! otherwise it won`t know the content
            headers: {
                "Content-type": "application/json"
            },
            //a must! don`t forget json stringify!
            body: JSON.stringify(body)
        })

        console.log(await res.json());
        loadAllBooks();
    } catch (error) {
        console.log(error);
    }

    clearFields();
}
async function loadAllBooks() {

    const getAllUrl = constants.baseUrl + "/appdata/" + constants.appId + "/Books";
    constants.tableBody.innerHTML = "";

    const res = await fetch(getAllUrl, {
        method: "GET",
        Authorization: `Basic ${btoa(constants.user + ':' + constants.password)}`,
        credentials: "include",
        headers: {
            'Content-type': "application/json"
        }
    })
    const books = await res.json();

    // debugger;
    books.forEach(bookInfo => {
        const newBook = createNode(bookInfo);
        console.log(newBook);
        constants.tableBody.appendChild(newBook);
    })


    // .then(res => res.json())
    // .then(books => {
    //     books.forEach(bookInfo => {
    //         const newBook = createNode(bookInfo);
    //         constants.tableBody.appendChild(newBook);
    //     })
    // })
}

function editBook(e) {
    const nodeInfo = e.target.parentNode.parentNode;
    console.log(nodeInfo);
    const [titleTd, authorTd, isbnTd] = Array.from(nodeInfo.children);
    const bookId = nodeInfo.getAttribute(`data-id`);

    const newForm = document.createElement(`form`);
    newForm.setAttribute(`data-id`, bookId);
    newForm.innerHTML = `<h3>EDIT BOOK</h3>
    <label>TITLE</label>
    <input type="title" id="title" value="${titleTd.textContent}">
    <label>AUTHOR</label>
    <input type="title" id="author" value="${authorTd.textContent}">
    <label>ISBN</label>
    <input type="title" id="isbn" value="${isbnTd.textContent}">
    <button>Done</button>
    <button>Cancel</button>`;
    const [doneBtn, cancelBtn] = Array.from(newForm.querySelectorAll(`button`));
    doneBtn.addEventListener(`click`, confirmEdit)
    cancelBtn.addEventListener(`click`, cancelEdit);

    let body = document.querySelector(`body`);

    const formToRemove = document.querySelector(`form`);
    body.removeChild(formToRemove);
    body.appendChild(newForm);

}

async function deleteBook(e) {
    const node = e.target.parentNode.parentNode;
    const bookId = node.getAttribute(`data-id`);
    node.remove();
    // console.log(bookId);
    // console.log(node);

    const deleteUrl = constants.baseUrl + "/" + "appdata" + "/" + constants.appId + "/" + "Books/" + bookId;
    const res = await fetch(deleteUrl,
        {
            method: "DELETE",
            credentials: "include",
            'Authorization': `Basic ${btoa(constants.user + ':' + constants.password)}`,
            headers: {
                "Content-type": "application/json"
            }
        })

    console.log(await res.json());
}



function createNode(bookInfo) {

    const { _id, title, author, isbn } = bookInfo;

    const newNode = document.createElement(`tr`);
    newNode.innerHTML = `<tr>
    <td>${title}</td>
    <td>${author}</td>
    <td>${isbn}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>`;
    //this is for the identifier
    newNode.setAttribute(`data-id`,_id);
    
    const [editBtn,deleteBtn]=Array.from(newNode.querySelectorAll(`button`));
    editBtn.addEventListener(`click`, editBook);
    deleteBtn.addEventListener(`click`, deleteBook);
    return newNode;
}
async function confirmEdit(e) {
    e.preventDefault();
    const target = e.target.parentNode;
    const bookId = target.getAttribute(`data-id`);
    // console.log(bookId);
    console.log(target);
    // debugger;
    const [titleInput, authorInput, isbnInput] = Array.from(target.querySelectorAll(`input`));

    const data = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    }
    console.log(data);
    // debugger;

    target.remove();
    appendSubmitForm();

    // debugger;
    const editUrl = constants.baseUrl + "/" + "appdata" + "/" + constants.appId + "/" + `Books/${bookId}`;


    console.log(bookId);
    console.log(editUrl);

    const res = await fetch(editUrl, {
        method: "PUT",
        Authorization: `Basic ${btoa(constants.user + ':' + constants.password)}`,
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    loadAllBooks();

}
function cancelEdit(e) {
    e.preventDefault();
    const formToRemove = e.target.parentNode;
    console.log(formToRemove);
    formToRemove.remove();

    appendSubmitForm();
}

function appendSubmitForm() {
    const newForm = document.createElement(`form`);
    newForm.innerHTML = `<h3>FORM</h3>
    <label>TITLE</label>
    <input type="title" id="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="title" id="author" placeholder="Author...">
    <label>ISBN</label>
    <input type="title" id="isbn" placeholder="Isnb...">
    <button>Submit</button>`;
    document.querySelector(`body`).appendChild(newForm);
}

function clearFields() {
    constants.isbnInput.value = "";
    constants.authorInput.value = "";
    constants.titleInput.value = "";
}


