function loadRepos() {
    let $repoList= $(`#repos`);
    $repoList.empty();

    let $userName = $(`#username`);
    let url = `https://api.github.com/users/` + $userName.val() + `/repos`;

    $.ajax({
        method: `GET`,
        url,
        success: onSuccessfulSearch,
        error: onOccuredError
    });

    function onSuccessfulSearch(returnedObjects) {

        returnedObjects.forEach(o=> {
            const listText=o.full_name;
            let $a=$(`<a href="${o.html_url}">`);
            $a.text(listText);
            const liItem=$(`<li>`);
            liItem.append($a);
            $repoList.append(liItem);
        })


    }

    function onOccuredError(error) {
        if (error.status===404){
            $repoList.append($(`<li>Error</li>`))
        }
    }
}