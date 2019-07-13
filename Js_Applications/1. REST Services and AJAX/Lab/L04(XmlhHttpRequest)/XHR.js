function loadRepos() {

    const url= `https://api.github.com/users/testnakov/repos`;

    const req= new XMLHttpRequest();
    req.onreadystatechange= (e)=>{
        const target=e.target;
        const status= target.status;
        const state= target.readyState;

        if (status===200 && state===4){
            document.getElementById(`res`).textContent=target.responseText;
        }
    };

    req.open(`GET`,url,false);

    req.send();
}
