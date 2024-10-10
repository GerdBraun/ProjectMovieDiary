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
    addMovie(movie, save=true){
        console.log(`movie "${movie.data.title}" was added to the MovieFavoritesList`);
        
        if(save){
            if(!checkInStorage(movie, this.localStorageName)){
                this.list.push(movie);
                addToStorage(movie, this.localStorageName)
            }else{
                alert('movie already added to favorites')
            }
        }else{
            console.log(movie)
            this.list.push(movie);
        }
    }

    removeMovie(movie){
        const newlist = this.list.filter((item) => item.id !== movie.data.id);
        this.list = newlist;
        this.saveListToLocalStorage(this.list);
    }

    /**
     * saves an array of movie (objects) to the local storage 
     * @param {Array} arr the array to save
     */
    saveListToLocalStorage(arr) {
        const arrToSave = arr.map((movie) => movie.data)
        saveListToLocalStorage(this.localStorageName, arrToSave);
    }

    /**
     * 
     * @returns an array of movie (objects) from the local storage 
     */
    getListFromLocalStorage() {
        const list =  getListFromLocalStorage(this.localStorageName);
        console.log('getListFromLocalStorage: ',list);

        return list
    }

    /**
     * renders the output (overwrites the method of the MovieeList)
     * @returns {Element} the element to be displayed
     */
    renderView() {
        return renderFavoritesListView(this);
    }
}
