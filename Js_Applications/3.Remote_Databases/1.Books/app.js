let constants = {
    titleInput: document.querySelector(`#title`),
    authorInput: document.querySelector(`#author`),
    isbnInput: document.querySelector(`#isbn`),


    submitBtn: document.querySelector(`form button`),
    loadBooksBtn: document.querySelector(`#loadBooks`),
    tableBody: document.querySelector(`tbody`),


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

    // debugger
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
    console.log(getAllUrl);
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

    books.forEach(bookInfo => {
        const newBook = createNode(bookInfo);
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

function createNode(bookInfo) {

    const { _id, title, author, isbn } = bookInfo;

    const sampleNode = document.querySelector(`thead tr`);

    const cloneNode = sampleNode.cloneNode(true);

    let [titleTd, authorTd, IsbnTd, tdBtns] = cloneNode.children;

    titleTd.textContent = title;
    authorTd.textContent = author;
    IsbnTd.textContent = isbn;

    //this is for the identifier
    cloneNode.setAttribute(`data-id`, _id);

    const [editBtn, deleteBtn] = tdBtns.children;

    editBtn.addEventListener(`click`, editBook);
    deleteBtn.addEventListener(`click`, deleteBook);

    cloneNode.setAttribute("display", "block");

    cloneNode.removeAttribute(`id`);
    return cloneNode;
}
async function deleteBook(e) {
    const node = e.target.parentNode.parentNode;
    const bookId = node.getAttribute(`data-id`);
    node.remove();
    console.log(bookId);
    console.log(node);

    const deleteUrl = constants.baseUrl + "/" + "appdata" + "/" + constants.appId + "/" + "Books/" + bookId;
    const res = await fetch(deleteUrl,
        {
            method: "DELETE",
            credentials: "include",
            'Authorization': `Basic ${btoa(constants.user + ':' + constants.password)}`,
            //a must! otherwise it won`t know the content
            headers: {
                "Content-type": "application/json"
            }
        })

    console.log(await res.json());
}

function editBook() {
//TODO:
    debugger;
}

function clearFields() {
    constants.isbnInput.value = "";
    constants.authorInput.value = "";
    constants.titleInput.value = "";
}