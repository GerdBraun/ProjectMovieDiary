// modules/svg.js

import { createPercentageSvg } from './svg.js';
import { checkInStorage} from './storage.js';


/**
 * renders the MovieList view
 * @param {MovieList} caller the calling class instance
 * @returns {Element} the rendered Element
 */
export const renderListView = (caller) => {
    // create list
    /*     const ul = document.createElement('ul');
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
    
     */


    const ul = document.createElement('ul');
    ul.classList = 'py-8 px-4 lg:px-6 flex gap-8 overflow-x-scroll bg-gray-300'

    caller.list.forEach((movie) => {
        
        console.log(movie.data.title+' is fav = '+checkInStorage(movie));

        const li = document.createElement('li');
        li.classList = 'card card w-52 max-w-52 flex-none shadow-lg rounded-lg bg-gray-100 relative';

        const card = document.createElement('div');
        //card.classList = 'card w-30 flex-none shadow-lg rounded-lg bg-gray-100'

        const link = document.createElement('button');
        link.classList = 'action-button relative  bg-gray-500 rounded-t-lg';
        link.dataset.id = movie.data.id;
        link.dataset.action = 'view';
        link.dataset.caller = caller.constructor.name; // pass the name of the Class
        link.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        link.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));

        const img = document.createElement('img');
        img.classList = 'rounded-t-lg hover:opacity-50';
        img.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + movie.data.poster_path;
        link.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        link.appendChild(img);

        const span = document.createElement('span');
        span.classList = 'absolute bottom-[-1rem] left-[-1rem]';

        const percentage = parseFloat(movie.data.vote_average) * 10;
        const svg = createPercentageSvg(percentage);
        svg.classList = 'w-10 h-10';

        span.appendChild(svg);

        link.appendChild(span)

        card.appendChild(link);

        const descDiv = document.createElement('div');
        const addBtn = document.createElement('button');
        addBtn.classList = 'action-button w-10 h-10 absolute top-[-1rem] right-[-1rem]';
        //addBtn.textContent = 'add';
        addBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 245" fill="#c82c2c">
<path d="m56,237 74-228 74,228L10,96h240"/>
</svg>`;
        addBtn.dataset.id = movie.data.id;
        addBtn.dataset.action = 'add';
        addBtn.dataset.caller = caller.constructor.name; // pass the name of the Class
        addBtn.addEventListener('click', (event) => caller.mainInstance.eventHandler(event));
        if(checkInStorage(movie)){
            addBtn.classList.add('active');
        }
        card.appendChild(addBtn);

        const title = document.createElement('h3');
        title.classList = 'p-2 text-center text-sm'
        title.textContent = movie.data.title;
        descDiv.appendChild(title);

        card.appendChild(descDiv);

        li.appendChild(card);

        ul.appendChild(li);
    })

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
    /*     const out = document.createElement('div');
    
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
    
     */
    const out = document.createElement('div');
    out.classList = `bg-cover bg-center bg-[url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${caller.data.poster_path})]`;

    const cover = document.createElement('div');
    cover.classList = 'bg-[rgba(0,0,0,.75)]';

    const innerDiv = document.createElement('div');
    innerDiv.classList = 'py-8 px-4 mx-auto max-w-screen-xl lg:px-6 flex gap-8 md:items-stretch';

    const divL = document.createElement('div');
    divL.classList = 'flex-1 basis-1/4';
    const img = document.createElement('img');
    img.src = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${caller.data.poster_path}`;
    img.alt = caller.data.title;
    divL.appendChild(img);
    innerDiv.appendChild(divL);

    const divR = document.createElement('div');
    divR.classList = 'flex-1 basis-3/4';

    // TODO: info in here
    const title = document.createElement('h3');
    title.classList = 'text-5xl text-white'
    title.textContent = caller.data.title;
    divR.appendChild(title);

    if(caller.data.original_title !== caller.data.title){
        const originalTitle = document.createElement('h4');
        originalTitle.classList = 'text-xl text-white'
        originalTitle.textContent = 'Original title: ' + caller.data.original_title;
        divR.appendChild(originalTitle);
    }

    const overview = document.createElement('p');
    overview.classList = 'text-white my-6'
    overview.textContent = caller.data.overview;
    divR.appendChild(overview);



    const details = document.createElement('div');
    details.id = 'additionalMovieDetails';
    details.classList = 'text-white my-6'
    details.textContent = 'details';
    divR.appendChild(details);


    const percentage = parseFloat(caller.data.vote_average) * 10;
    const svg = createPercentageSvg(percentage);
    svg.classList = 'w-20 h-20';
    divR.appendChild(svg);


    innerDiv.appendChild(divR);

    cover.appendChild(innerDiv);

    out.appendChild(cover);

    return out

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

export const renderMovieAdditionalDetails = (details) => {
    const out = document.createElement('div');

    if(details.homepage){
        const link = document.createElement('a');
        link.classList = 'block mb-6 hover:text-gray-300';
        link.href = details.homepage;
        link.target = '_blank';
        link.textContent = 'Homepage >';
        out.appendChild(link);
    }


    const castTitle = document.createElement('h4');
    castTitle.textContent = 'Cast';
    castTitle.classList = 'text-xl';
    out.appendChild(castTitle);

    const ul = document.createElement('ul');
    ul.classList = 'w-full md:flex md:gap-8 md:overflow-x-scroll md:max-w-screen-md';
    details.credits.cast.forEach((actor) => {
        if (actor.profile_path) {

            const li = document.createElement('li');
            li.classList = 'max-w-32 flex-none';

            const img = document.createElement('img');
            img.src = `https://media.themoviedb.org/t/p/w276_and_h350_face/${actor.profile_path}`;
            img.alt = actor.name
            li.appendChild(img);

            const name = document.createElement('h5');
            name.classList = 'text-sm';
            name.textContent = actor.name;
            li.appendChild(name);

            if(actor.character){
                const character = document.createElement('p');
                character.classList = 'text-xs';
                character.textContent = 'as ' + actor.character;
                li.appendChild(character);
            }

            ul.appendChild(li);
        }
    })

    out.appendChild(ul);

    return out;
}