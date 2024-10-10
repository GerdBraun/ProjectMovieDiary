import { renderListView, renderFavoritesListView, renderDetailsView } from '../ui.js';
import { saveListToLocalStorage, getListFromLocalStorage } from '../storage.js';
import { fetchInitial, fetchMovieDetails } from '../network.js';

import {Movie} from './Movie.js';

export {Movie};

/**
 * a list for the retrieved movies
 */
export class MovieList {
    // private vars
    #list = []; // an array for Movies
    #mainInstance = {}; // the main instance for event handlers

    constructor() {
        // do whatever needed
    }

    // getters & setters
    set mainInstance(val) {
        this.#mainInstance = val
    }
    get mainInstance() {
        return this.#mainInstance
    }

    set list(val) {
        this.#list = val
    }
    get list() {
        return this.#list;
    }

    /**
     * adds a movie to the list
     * @param {Movie} movie 
     */
    addMovie(movie) {
        this.list.push(movie);
    }

    /**
     * gets a movie from the list based on it's ID
     * @param {Number} id the ID of the movie to get
     * @returns {Movie} the found movie
     */
    getMovieById(id) {
        // return the first element of the filtered results
        return this.#list.filter((movie) => {
            return movie.id === parseInt(id)
        })[0]
    }

    /**
     * renders the output
     * @returns {Element} the element to be displayed
     */
    renderView() {
        // call corresponding function from module
        return renderListView(this);
    }
}
