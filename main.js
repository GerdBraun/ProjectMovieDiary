import {initialData} from './modules/initialData.js';

import { renderListView, renderFavoritesListView, renderDetailsView } from './modules/ui.js';
import { saveListToLocalStorage, getListFromLocalStorage } from './modules/storage.js';
import { fetchInitial, fetchMovieDetails } from './modules/network.js';

import {Movie} from './modules/classes/Movie.js';
import {MovieList} from './modules/classes/MovieList.js';
import {MovieFavoritesList} from './modules/classes/MovieFavoritesList.js';





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
        //this.#movieList.renderView();

        this.renderView('movieList', 1745);
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
        const dataset = event.target.dataset;

        switch (dataset.action) {
            case 'view':
                // show detail view
                this.renderView('details', dataset.caller, dataset.id);
                break;
            case 'add':
                // add movie to favorites
                const movie = this.#movieList.getMovieById(dataset.id);
                console.log(movie);

                this.#movieFavoritesList.addMovie(movie);

                this.renderView('movieFavoritesList')
                break;
            case 'remove':
                // remove movies from favorites
                break;
            default:
        }
    }
}

// create an instance of Main
const mainInstance = new Main();

// add initial data  to main 
for(let key in initialData){
    mainInstance[key] = initialData[key]
}

// place the initial call 
mainInstance.fetchInitial();