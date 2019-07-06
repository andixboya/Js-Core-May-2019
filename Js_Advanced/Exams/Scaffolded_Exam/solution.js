function addSticker() {
    const inputTitle = document.querySelector(`[class="title"]`);
    const title = inputTitle.value;

    const inputText = document.querySelector(`[class="content"]`);
    const text = inputText.value;

    const stickerList = document.querySelector('#sticker-list');

    if (title && text) {
        const a = document.createElement('a');
        a.classList.add('button');
        a.textContent = 'x';

        a.addEventListener('click', function (e) {
            console.log(e);
            const parent = e.target.parentNode.parentNode
            const child = e.target.parentNode
            parent.removeChild(child);
        });


        const h2 = document.createElement('h2');
        h2.textContent = title;

        const hr = document.createElement('hr');

        const p = document.createElement('p');
        p.textContent = text;

        const li = document.createElement('li');
        li.classList.add(`note-content`)

        li.appendChild(a);
        li.appendChild(h2);
        li.appendChild(hr);
        li.appendChild(p);

        stickerList.appendChild(li);
    }

    inputTitle.value = '';
    inputText.value = '';
}