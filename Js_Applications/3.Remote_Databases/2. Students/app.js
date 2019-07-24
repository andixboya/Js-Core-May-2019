const constants = {
    submitBtn: document.querySelector(`#submit`),
    listBtn: document.querySelector(`#loadBooks`),


    firstNameInput: document.querySelector(`#firstName`),
    lastNameInput: document.querySelector(`#lastName`),
    facultyNumberInput: document.querySelector(`#facultyNumber`),
    gradeInput: document.querySelector(`#grade`),
    
    tBody: document.querySelector(`tbody`),

    user: `pesho`,
    password: `pesho`,

    appId: `kid_rJ2Wd8QzS`,
    appSecret: `84cd267405c64d22a3b8542f16538dd5`,

    baseUrl: `https:/baas.kinvey.com/`
}

constants.submitBtn.addEventListener(`click`, createStudent)
constants.listBtn.addEventListener(`click`,loadStudents)

function createStudent(e) {
    e.preventDefault();
    const firstName = constants.firstNameInput.value;
    const lastName = constants.lastNameInput.value;
    const facultyNumber = constants.facultyNumberInput.value;
    const grade = constants.gradeInput.value;
    // debugger;

    const data = {
        firstName,
        lastName,
        facultyNumber,
        grade
    }

    const createStudentUrl = constants.baseUrl + `appdata/` + constants.appId + `/` + `Students`

    fetch(createStudentUrl, {
        method: `POST`,
        credentials: "include",
        Authorization: `Basic ${btoa(constants.user + ':' + constants.password)}`,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(handleRequest)
        .then(res => {
            clearFields();
            // debugger
            console.log(res)
        })
        .catch(err => console.log(err));
}
async function loadStudents(){
    
    constants.tBody.innerHTML=``;
    //mistake => don`t forget the dots! (just test it)
    const baseListAllSortedUrl= constants.baseUrl+"appdata/"+constants.appId+'/Students?query={}&sort={"_id":1}'

    const res= await fetch(baseListAllSortedUrl,{
        method: "GET",
        credentials: "include",
        Authorization: `Base ${constants.user+':'+constants.password}`,
        headers: {
            "Content-type":"application/json"
        }
    })
    const students= Array.from(await res.json());

    let counter=1;
    let fragment=document.createDocumentFragment();
    students.forEach(st=> {
        
        const student= generateStudent(st,counter);
        counter++;
        fragment.appendChild(student);
    })
    constants.tBody.appendChild(fragment);
}

function generateStudent(student,id) {
    const {firstName,lastName,facultyNumber,grade}=student;
    const trElement= document.createElement(`tr`);
    trElement.innerHTML=`<td>${id}</td>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${facultyNumber}</td>
    <td>${grade}</td>`

    return trElement;
}


function handleRequest(res) {
    return res.json();
}

function clearFields() {
    constants.firstNameInput.value = ``;
    constants.lastNameInput.value = ``;
    constants.facultyNumberInput.value = ``;
    constants.gradeInput.value = ``;
}