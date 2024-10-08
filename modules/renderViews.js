// modules/svg.js

import { createPercentageSvg } from './svg.js';


/**
 * renders the MovieList view
 * @param {MovieList} caller the calling class instance
 * @returns {Element} the rendered Element
 */
export function renderListView(caller) {
    // create list
    const ul = document.createElement('ul');
    caller.list.forEach((movie) => {
        const li = document.createElement('li');
        li.classList = 'flex p-2 pl-3 text-gray-800 bg-white rounded shadow mb-1 justify-between items-center';

        const firstSpan = document.createElement('span');
        firstSpan.textContent = movie.data.title;
        firstSpan.classList = 'flex gap-2 items-center'

        const percentage = parseInt(movie.data.vote_average) * 10;
        const svg = createPercentageSvg(percentage);
        //svg.classList = 'w-10 h-10 bg-black';
        svg.classList = 'w-6 h-6';
        firstSpan.prepend(svg);


        li.appendChild(firstSpan);


        const span = document.createElement('span');
        span.classList = 'flex gap-2';

        const viewBtn = document.createElement('button');
        viewBtn.classList = 'action-button movie-button movie-button-green';
        viewBtn.textContent = 'view';
        viewBtn.dataset.id = movie.data.id;
        viewBtn.dataset.action = 'view';
        viewBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        viewBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(viewBtn);

        const addBtn = document.createElement('button');
        addBtn.classList = 'action-button movie-button movie-button-green';
        addBtn.textContent = 'add';
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
export function renderFavoritesListView(caller) {
    // create list
    const ul = document.createElement('ul');
    caller.list.forEach((movie) => {
        const li = document.createElement('li');
        li.classList = 'flex p-2 pl-3 text-gray-800 bg-white rounded shadow mb-1 justify-between items-center';

        const firstSpan = document.createElement('span');
        firstSpan.textContent = movie.data.title;
        firstSpan.classList = 'flex gap-2 items-center'

        const percentage = parseInt(movie.data.vote_average) * 10;
        const svg = createPercentageSvg(percentage);
        //svg.classList = 'w-10 h-10 bg-black';
        svg.classList = 'w-6 h-6';
        firstSpan.prepend(svg);


        li.appendChild(firstSpan);


        const span = document.createElement('span');
        span.classList = 'flex gap-2';

        const viewBtn = document.createElement('button');
        viewBtn.classList = 'action-button movie-button movie-button-green';
        viewBtn.textContent = 'view';
        viewBtn.dataset.id = movie.data.id;
        viewBtn.dataset.action = 'view';
        viewBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        viewBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        span.appendChild(viewBtn);

        const addBtn = document.createElement('button');
        addBtn.classList = 'action-button movie-button movie-button-green';
        addBtn.textContent = 'add';
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
 * renders the Movie view
 * @param {Movie} caller the calling class instance
 * @param {String} pathToImages 
 * @returns {Element} the element to be displayed
 */
export function renderDetailsView(caller, pathToImages) {
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
