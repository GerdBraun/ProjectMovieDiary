import { renderListView, renderFavoritesListView, renderDetailsView,renderMovieAdditionalDetails } from '../ui.js';
import { saveListToLocalStorage, getListFromLocalStorage } from '../storage.js';
import { fetchInitial, fetchMovieDetails } from '../network.js';

/**
 * a class for the movies
 */
export class Movie {
    // private vars
    // #id = 0;    // the id of the movie ! we'll take it from the data object
    #data = {};  // for storing the fetched data object
    #details = {} // for storing the fetched detail object
    #mainInstance = {}; // the main instance for event handlers

    //constructor method
    constructor(movieObject) {
        // build a new Movie based on the dataObject
        this.data = movieObject || {};
        this.data.commentsList = this.data.commentsList || [];
    }

    // getters & setters
    set mainInstance(val) {
        this.#mainInstance = val
    }
    get mainInstance() {
        return this.#mainInstance
    }

    set id(val) {
        this.#data.id = val
    }
    get id() {
        return this.#data.id;
    }
    set data(val) {
        this.#data = val
    }
    get data() {
        return this.#data;
    }

    set details(val) {
        this.#details = val
    }
    get details() {
        return this.#details;
    }

    async fetchMovieDetails() {
        // TODO: fetch the detail data
        // url-example: 'https://api.themoviedb.org/3/movie/533535?language=en-US&api_key=153a09fbeef547fb0435feeeb75d0140'
        this.details = fetchMovieDetails(this, this.data.id);
    }

    populateMovieDetails(details) {
        this.details = details;

        console.log('Movie.populateMovieDetails -> ', details);

        // add more details
        const detailsContainer = document.querySelector('#additionalMovieDetails');
        detailsContainer.innerHTML = '';
        
        const out = renderMovieAdditionalDetails(details);

        detailsContainer.appendChild(out);
    }

    /**
     * renders the output
     * @param {String} pathToImages 
     * @returns {Element} the element to be displayed
     */
    renderView(pathToImages) {
        this.fetchMovieDetails();

        return renderDetailsView(this, pathToImages)
    }


    // comments

    get commentsList() {
        return this.data.commentsList
    }
    set commentsList(arr) {
        this.data.commentsList = arr;
    }

    addComment(text) {
        console.log(text);
        const commentObj = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            text: text,
        }
        this.data.commentsList.unshift(commentObj);
    }

    removeCommentById(id) {

        console.log('remove comment ', id);
        this.data.commentsList = this.data.commentsList.filter((comment) => comment.id !== id);
        console.log(this.data.commentsList);
    }
}
