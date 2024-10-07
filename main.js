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
    get id() {
        return this.#list;
    }
}

/**
 * a list for the favorite movies
 */
class MovieFavoritesList extends MovieList {

    constructor() {
        super();
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
}

/**
 * handle everything inside the page...
 */
class Main{
    constructor(){
        // do important things
    }
}