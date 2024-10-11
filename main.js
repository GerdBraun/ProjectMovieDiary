import { initialData } from './modules/initialData.js';

import { renderListView, renderFavoritesListView, renderDetailsView, renderModalComments } from './modules/ui.js';
import { saveListToLocalStorage, getListFromLocalStorage, checkInStorage } from './modules/storage.js';
import { fetchInitial, fetchMovieDetails } from './modules/network.js';

import { Movie } from './modules/classes/Movie.js';
import { MovieList } from './modules/classes/MovieList.js';
import { MovieFavoritesList } from './modules/classes/MovieFavoritesList.js';





/**
 * handle everything inside the page...
 */
class Main {
    #apiKey = '';
    #pathToTmdb = '';
    #pathToImages = '';
    #initialCall = '';
    #localStorageName = '';

    #language = '';

    #movieList = new MovieList();
    #movieFavoritesList = new MovieFavoritesList();

    #movieListView;
    #movieFavoritesListView;
    #detailView;


    constructor() {
        // do important things

        // pass the main instance for event listeners
        this.#movieList.mainInstance = this;
        this.#movieFavoritesList.mainInstance = this;

        // add event listener for search
        document.querySelector('#searchForm').addEventListener('submit', (event) => this.eventHandler(event))
    }

    // getters & setters
    set apiKey(val) {
        this.#apiKey = val
    }
    get apiKey() {
        return this.#apiKey
    }

    set pathToTmdb(val) {
        this.#pathToTmdb = val
    }
    get pathToTmdb() {
        return this.#pathToTmdb
    }

    set pathToImages(val) {
        this.#pathToImages = val
    }
    get pathToImages() {
        return this.#pathToImages
    }

    set initialCall(val) {
        this.#initialCall = val
    }
    get initialCall() {
        return this.#initialCall
    }

    set movieListView(val) {
        this.#movieListView = val;
    }
    set movieFavoritesListView(val) {
        this.#movieFavoritesListView = val;
    }
    set detailView(val) {
        this.#detailView = val;
    }

    set language(val) {
        this.#language = val;
    }


    set localStorageName(val) {
        this.#localStorageName = val;
        // pass the value to the favorites list, too
        this.#movieFavoritesList.localStorageName = val;
    }
    get localStorageName() {
        return this.#localStorageName
    }

    /**
     * the initial fetch from TMDB (retrieves the first page of results based on the initial path)
     */
    fetchInitial() {
        fetchInitial(this);
    }

    /**
     * fill the MovieList with movies
     * @param {Array} arr the array of movieObjects fetched  before
     */
    populateMovieList(arr = []) {
        console.info('populating the MovieList')
        arr.forEach(movieObject => {
            // create new instance of Movie (and pass the data object)
            const movie = new Movie(movieObject);
            movie.mainInstance = this;
            // add the movie instance to the list
            this.#movieList.addMovie(movie);
        });
        this.renderView('movieList');


        // not so elegant, but working... ?
        const movieFavList = this.#movieFavoritesList.getListFromLocalStorage();
        this.populateMovieFavoritesList(movieFavList);
    }

    populateMovieFavoritesList(arr = []) {
        console.info('populating the movieFavoritesList')
        arr.forEach(movieObject => {
            // create new instance of Movie (and pass the data object)
            const movie = new Movie(movieObject);
            movie.mainInstance = this;
            // add the movie instance to the list
            this.#movieFavoritesList.addMovie(movie, false);
        });
        this.renderView('movieFavoritesList');
    }

    /**
     * renders the output
     * @param {String} output the target to put the content to
     * @param {Object} sourceList the source list of the data (MovieList or MovieFavList)
     * @param {*} movieId the ID of the movie to display
     */
    renderView(output, sourceList = null, movieId = null) {

        let outContainer = null;
        let content = null;

        switch (output) {
            case 'movieList':
                // render the movieList
                outContainer = document.querySelector(this.#movieListView);
                outContainer.innerHTML = '';
                content = this.#movieList.renderView();
                outContainer.appendChild(content);
                break;
            case 'movieFavoritesList':
                // render the movieFavoriteList
                console.log(this.#movieFavoritesListView);
                outContainer = document.querySelector(this.#movieFavoritesListView);
                outContainer.innerHTML = '';
                content = this.#movieFavoritesList.renderView();
                outContainer.appendChild(content);
                break;
            case 'details':
                // render the details
                outContainer = document.querySelector(this.#detailView);
                outContainer.innerHTML = '';
                let movie;
                if (sourceList === 'MovieList') {
                    movie = this.#movieList.getMovieById(movieId)
                } else {
                    movie = this.#movieFavoritesList.getMovieById(movieId)
                }
                content = movie.renderView(this.pathToImages);
                outContainer.appendChild(content);
        }
    }

    /**
     * handle the events sent to main instance
     * @param {Event} event 
     */
    eventHandler(event) {
        const dataset = event.currentTarget.dataset;
        console.log(event)
        switch (dataset.action) {
            case 'view':
                console.log('view')
                // show detail view
                this.renderView('details', dataset.caller, dataset.id);

                const detailsContainer = document.querySelector(this.#detailView);
                detailsContainer.scrollIntoView(true);
                break;
            case 'add':
                // add movie to favorites
                const movie = this.#movieList.getMovieById(dataset.id);
                event.currentTarget.classList.add('active')
                this.#movieFavoritesList.addMovie(movie);

                this.renderView('movieFavoritesList');

                const favsContainer = document.querySelector(this.#movieFavoritesListView);
                favsContainer.scrollIntoView(true);

                event.currentTarget.dataset.action = 'remove';
                const btnsAdd = document.querySelectorAll(`button[data-action="add"][data-id="${dataset.id}"]`);
                btnsAdd.forEach((btn) => {
                    btn.classList.add('active');
                    btn.dataset.action = 'remove';
                })
               
                break;
            case 'remove':
                // remove movies from favorites
                const movieR = this.#movieFavoritesList.getMovieById(dataset.id);
                console.log(movieR);
                if (confirm(`really remove "${movieR.data.title}" from your favorites?`)) {

                    this.#movieFavoritesList.removeMovie(movieR);
                    this.renderView('movieFavoritesList')
                }

                const btnsRemove = document.querySelectorAll(`button[data-action="remove"][data-id="${dataset.id}"]`);
                btnsRemove.forEach((btn) => {
                    btn.classList.remove('active');
                    btn.dataset.action = 'add';
                })


                break;

            // comments (commentId needed in dataset)
            case 'openCommentModal':
                const movieCView = this.#movieFavoritesList.getMovieById(dataset.id);

                const modal = document.querySelector('#modal');
                modal.querySelector('#modal-title').textContent = `Movie "${movieCView.data.title}" comments`;

                const modalContent = renderModalComments(this.#movieFavoritesList, movieCView);
                document.querySelector('#modalContent').innerHTML = '';
                document.querySelector('#modalContent').appendChild(modalContent);

                modal.classList.remove('hidden');
                break;
            case 'addComment':
                event.preventDefault();
                console.log('adding comment')
                const movieCAdd = this.#movieFavoritesList.getMovieById(dataset.id);
                const text = document.querySelector('#commentText').value;
                if (text !== '') movieCAdd.addComment(text);

                this.#movieFavoritesList.saveListToLocalStorage(this.#movieFavoritesList.list)

                document.querySelector('#modal').classList.add('hidden');
                break;
            case 'removeComment':
                const movieCRem = this.#movieFavoritesList.getMovieById(dataset.id);
                movieCRem.removeCommentById(dataset.commentId);
                document.querySelector('#modal').classList.add('hidden');

                this.#movieFavoritesList.saveListToLocalStorage(this.#movieFavoritesList.list)

                break;

            // search
            case 'search':
                event.preventDefault();
                const searchTerm = document.querySelector('#searchString').value;
                if (searchTerm) {
                    this.search(searchTerm)
                } else {
                    alert('do you really want to search for nothing???');
                }
                break;
            default:
        }
    }

    search(searchTerm) {
        console.log('searching for ', searchTerm);
        searchTerm = encodeURI(searchTerm);

        const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${this.apiKey}`;
        const rsults = fetch(url)
            .then(response => response.json())
            .then(response => {
                this.showSearchResults(response.results, searchTerm);
            })
            .catch(err => console.error(err));
    }
    async showSearchResults(results, searchTerm) {
        if (results.length) {
            // clear the movie list;
            this.#movieList.list = [];
            this.#movieFavoritesList.list = [];
            this.populateMovieList(results);
        } else {
            alert(`nothing found searching for "${searchTerm}"`);
        }
    }
}

// create an instance of Main
const mainInstance = new Main();

// add initial data  to main 
for (let key in initialData) {
    mainInstance[key] = initialData[key]
}

// place the initial call 
mainInstance.fetchInitial();