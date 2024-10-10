// modules/svg.js

import { createPercentageSvg } from './svg.js';


/**
 * renders the MovieList view
 * @param {MovieList} caller the calling class instance
 * @returns {Element} the rendered Element
 */
export const renderListView = (caller) => {
    // create list
    const ul = document.createElement('ul');
    caller.list.forEach((movie) => {
        const li = document.createElement('li');
        li.classList = 'flex p-2 pl-3 text-gray-800 bg-white rounded shadow mb-1 justify-between items-center';

        const firstSpan = document.createElement('span');
        firstSpan.textContent = movie.data.title;
        firstSpan.classList = 'flex gap-2 items-center'

        const percentage = parseFloat(movie.data.vote_average) * 10;
        const svg = createPercentageSvg(percentage);
        //svg.classList = 'w-10 h-10 bg-black';
        svg.classList = 'w-10 h-10';
        firstSpan.prepend(svg);


        li.appendChild(firstSpan);


        const span = document.createElement('span');
        span.classList = 'flex gap-2';

        const viewBtn = document.createElement('button');
        viewBtn.classList = 'action-button movie-button movie-button-green';
        //viewBtn.textContent = 'view';
        viewBtn.innerHTML = '&#x1f441;';
        viewBtn.dataset.id = movie.data.id;
        viewBtn.dataset.action = 'view';
        viewBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        viewBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(viewBtn);

        const addBtn = document.createElement('button');
        addBtn.classList = 'action-button movie-button movie-button-green';
        //addBtn.textContent = 'add';
        addBtn.innerHTML = '&#9829;';
        addBtn.dataset.id = movie.data.id;
        addBtn.dataset.action = 'add';
        addBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        addBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(addBtn);

        li.appendChild(span);

        ul.appendChild(li);
    });

    return ul;
}

/**
 * renders the MovieFavoritesList view
 * @param {MovieFavoritesList} caller the calling class instance
 * @returns {Element} the rendered Element
 */
export const renderFavoritesListView = (caller) => {
    // create list
    const ul = document.createElement('ul');
    caller.list.forEach((movie) => {
        const li = document.createElement('li');
        li.classList = 'flex p-2 pl-3 text-gray-800 bg-white rounded shadow mb-1 justify-between items-center';

        const firstSpan = document.createElement('span');
        firstSpan.textContent = movie.data.title;
        firstSpan.classList = 'flex gap-2 items-center'

        const percentage = parseFloat(movie.data.vote_average) * 10;
        const svg = createPercentageSvg(percentage);
        //svg.classList = 'w-10 h-10 bg-black';
        svg.classList = 'w-10 h-10';
        firstSpan.prepend(svg);


        li.appendChild(firstSpan);


        const span = document.createElement('span');
        span.classList = 'flex gap-2';

        const viewBtn = document.createElement('button');
        viewBtn.classList = 'action-button movie-button movie-button-green';
        //viewBtn.textContent = 'view';
        viewBtn.innerHTML = '&#x1f441;';
        viewBtn.dataset.id = movie.data.id;
        viewBtn.dataset.action = 'view';
        viewBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        viewBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(viewBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList = 'action-button movie-button movie-button-red';
        //removeBtn.textContent = 'remove';
        removeBtn.innerHTML = '&#10006;'
        removeBtn.dataset.id = movie.data.id;
        removeBtn.dataset.action = 'remove';
        removeBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        removeBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(removeBtn);


        const commentOpenModal = document.createElement('button');
        commentOpenModal.classList = 'action-button movie-button movie-button-green';
        //viewBtn.textContent = 'view';
        commentOpenModal.innerHTML = '&#x1f441;';
        commentOpenModal.dataset.id = movie.data.id;
        commentOpenModal.dataset.action = 'openCommentModal';
        commentOpenModal.dataset.caller = caller.constructor.name; // pass the name of the Class
        commentOpenModal.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(commentOpenModal);

        li.appendChild(span);

        ul.appendChild(li);
    });

    return ul;
}

/**
 * renders the Movie view
 * @param {Movie} caller the calling class instance
 * @param {String} pathToImages 
 * @returns {Element} the element to be displayed
 */
export const renderDetailsView = (caller, pathToImages) => {
    // TODO: fetch detail data first!

    // TODO: build output...
    const out = document.createElement('div');

    const test = document.createElement('p');
    test.innerHTML = '<strong>"' + caller.data.title + '"</strong> [' + caller.data.release_date + ']';
    if (caller.data.title !== caller.data.original_title) test.innerHTML += '<br>(' + caller.data.original_title + ')';
    test.innerHTML += '<br>created by Movie.renderView<br>has to be fetched every time';
    out.appendChild(test);

    const img = document.createElement('img');
    img.src = pathToImages + caller.data.poster_path;
    out.appendChild(img);

    const overview = document.createElement('p');
    overview.textContent = caller.data.overview;
    out.appendChild(overview);

    return out;
}

export const renderModalComments = (caller, movie) => {

    const div = document.createElement('div');

    const form = document.createElement('form');
    form.classList = 'flex flex-col';

    const label = document.createElement('label');
    label.for = 'commentText';
    label.textContent = 'Comment';
    form.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.id = 'commentText';
    textarea.placeholder = 'enter your comment here';
    form.appendChild(textarea);

    div.appendChild(form);

    const btn = document.createElement('button');
    btn.classList = 'action-button movie-button movie-button-green';
    btn.dataset.caller = caller.constructor.name;
    btn.dataset.action = 'addComment';
    btn.dataset.id = movie.data.id;
    btn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
    btn.textContent = 'add comment';
    form.appendChild(btn);

console.log(movie)

    const ul = document.createElement('ul');
    movie.data.commentsList.forEach((comment) => {
        const li = document.createElement('li');
        li.classList = 'p-2 pl-3 text-gray-800 bg-white rounded shadow mb-1 flex flex-col'

        const ts = new Date(comment.timestamp);
        const time = document.createElement('span');
        time.classList = 'text-sm';
        time.textContent = ts.toLocaleString();
        li.appendChild(time);

        const text = document.createElement('span');
        text.textContent = comment.text;
        li.appendChild(text);

        const btn = document.createElement('button');
        btn.textContent = 'remove';
        btn.dataset.caller = caller.constructor.name;
        btn.dataset.action = 'removeComment';
        btn.dataset.id = movie.data.id;
        btn.dataset.commentId = comment.id;
        btn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        li.appendChild(btn);

        ul.appendChild(li);
    })
    div.appendChild(ul);

    return div
}