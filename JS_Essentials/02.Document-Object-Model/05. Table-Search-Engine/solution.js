function solve() {

    let button = document.getElementById(`searchBtn`);

    button.addEventListener(`click`, selectFound);

    function selectFound() {
        let searchField = document.getElementById(`searchField`);
        let searchedWord = searchField.value;
        let trs = Array.from(document.getElementsByTagName(`tr`));
        trs.forEach(t => t.removeAttribute(`class`));

        let tds = Array.from(document.getElementsByTagName(`td`)).splice(1);
        tds = tds
            .filter(t => containParam(t));

        let set = new Set();

        for (let el of tds) {
            let parent = el.parentNode;
            set.add(parent);
        }
        for (let el of [...set]) {
            el.setAttribute(`class`, `select`);
        }


        function containParam(td) {
            let text = td.textContent;
            return text.includes(searchedWord);
        }

    }
}