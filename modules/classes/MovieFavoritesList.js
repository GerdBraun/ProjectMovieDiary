import { renderListView, renderFavoritesListView, renderDetailsView } from '../ui.js';
import { saveListToLocalStorage, getListFromLocalStorage,addToStorage,removeFromStorage,checkInStorage } from '../storage.js';
import { fetchInitial, fetchMovieDetails } from '../network.js';
import {MovieList, Movie} from './MovieList.js';

/**
 * a list for the favorite movies
 */
export class MovieFavoritesList extends MovieList {
    #localStorageName = '';

    constructor() {
        // initiate the super class (MovieList), so this has everything from there
        super();

        this.getListFromLocalStorage();
    }

    // getters & setters
    set localStorageName(val) {
        this.#localStorageName = val
    }
    get localStorageName() {
        return this.#localStorageName;
    }

    /**
     * adds a movie to the list (overwrites the corresponding MovieList method)
     * @param {Movie} movie the movie to add
     */
    addMovie(movie){
        console.log(`movie "${movie.data.title}" was added to the MovieFavoritesList`);
        // TODO: prevent adding a movie already existing
        if(!checkInStorage(movie, this.localStorageName)){
            this.list.push(movie);
            // TODO: add it to the local storage
        }else{
            alert('movie already added to favorites')
        }
    }

    /**
     * saves an array of movie (objects) to the local storage 
     * @param {Array} arr the array to save
     */
    saveListToLocalStorage(arr) {
        //localStorage.setItem(this.localStorageName, JSON.stringify(arr));
        saveListToLocalStorage(this.localStorageName, arr);
    }

    /**
     * 
     * @returns an array of movie (objects) from the local storage 
     */
    getListFromLocalStorage() {
        //return JSON.parse(localStorage.getItem(this.localStorageName)) || [];
        return getListFromLocalStorage(this.localStorageName);
    }

    /**
     * renders the output (overwrites the method of the MovieeList)
     * @returns {Element} the element to be displayed
     */
    renderView() {
        return renderFavoritesListView(this);
    }
}
