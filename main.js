/**
 * a class for the movies
 */
class Movie {
    // private vars
    #id = 0;    // the id of the movie
    #data = {};  // for storing the gfetched data object

    //constructor method
    constructor() {

    }

    // getters & setters
    set id(val) {
        this.#id = val
    }
    get id() {
        return this.#id;
    }
    set data(val) {
        this.#data = val
    }
    get data() {
        return this.#data;
    }
}

/**
 * a list for the retrieved movies
 */
class MovieList {
    // private vars
    #list = []; // an array for Movies

    constructor() {

    }

    // getters & setters
    set list(val) {
        this.#list = val
    }
    get list() {
        return this.#list;
    }

    getMovieById(id) {
        // TODO: find movie in list and return it
    }
}

/**
 * a list for the favorite movies
 */
class MovieFavoritesList extends MovieList {
    #localStorageName = '';

    constructor() {
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
      * do something with a Movie instance
      * @param {Movie} movie a Movie instance
      * @returns something
      */
    doSomethingWithAMovie(movie) {
        outString = 'nothing special';
        return outString;
    }

    /**
     * adds a movie to the list
     * @param {Movie} movie 
     */
    addMovie(movie) {
        this.list.push(movie);
    }

    /**
     * saves an array of movie (objects) to the local storage 
     * @param {Array} arr the array to save
     */
    saveListToLocalStorage(arr) {
        localStorage.setItem(this.#localStorageName, JSON.stringify(arr));
    }

    /**
     * 
     * @returns an array of movie (objects) from the local storage 
     */
    getListFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.#localStorageName)) || [];
    }
}

/**
 * handle everything inside the page...
 */
class Main {
    #apiKey = '';
    #pathToTmdb = '';
    #pathToImages = '';
    #localStorageName = '';

    #movielist = new MovieList();
    #movieFavoritesList = new MovieFavoritesList();

    constructor() {
        // do important things

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

    set localStorageName(val) {
        this.#localStorageName = val;
        // pass the value to the favorites list, too
        this.#movieFavoritesList.localStorageName = val;
    }
    get localStorageName() {
        return this.#localStorageName
    }
}

// create an instance of Main
const mainInstance = new Main();

// set initial values
mainInstance.apiKey = '153a09fbeef547fb0435feeeb75d0140' // use it as url-parameter like 'api_key=153a09fbeef547fb0435feeeb75d0140'
mainInstance.pathToTmdb = 'https://api.themoviedb.org/3/discover/movie';
mainInstance.pathToImages = 'https://image.tmdb.org/t/p/original'; // see readdme.md for other options
mainInstance.localStorageName = 'movieFavs';