/**
 * a class for the movies
 */
class Movie {
    // private vars
    // #id = 0;    // the id of the movie ! we'll take it from the data object
    #data = {};  // for storing the fetched data object
    #details = {} // for storing the fetched detail object
    #mainInstance = {}; // the main instance for event handlers

    //constructor method
    constructor(movieObject) {
        // build a new Movie based on the dataObject
        this.data = movieObject || {};
    }

    // getters & setters
    set mainInstance(val) {
        this.#mainInstance = val
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

    fetchMovieDetails() {
        // TODO: fetch the detail data
        // url-example: 'https://api.themoviedb.org/3/movie/533535?language=en-US&api_key=153a09fbeef547fb0435feeeb75d0140'
        return details;
    }

    /**
     * renders the output
     * @returns {Element} the element to be displayed
     */
    renderView(pathToImages) {
        // TODO: fetch detail data first!

        // TODO: build output...
        const out = document.createElement('div');

        const test = document.createElement('p');
        test.innerHTML = '<strong>"' + this.data.title+'"</strong> ['+this.data.release_date+']';
        if (this.data.title !== this.data.original_title) test.innerHTML += '<br>(' + this.data.original_title + ')';
        test.innerHTML += '<br>created by Movie.renderView<br>has to be fetched every time';
        out.appendChild(test);

        const img = document.createElement('img');
        img.src = pathToImages + this.data.poster_path;
        out.appendChild(img);

        const overview = document.createElement('p');
        overview.textContent = this.data.overview;
        out.appendChild(overview);

        return out;
    }
}

/**
 * a list for the retrieved movies
 */
class MovieList {
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
        console.log(`movie "${movie.data.title}" was added to the MovieList`);
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
        // create list
        const ul = document.createElement('ul');
        this.list.forEach((movie) => {
            const li = document.createElement('li');
            li.classList = 'flex p-2 pl-3 text-gray-800 bg-white rounded shadow mb-1 justify-between items-center'
            li.textContent = movie.data.title;

            const span = document.createElement('span');
            span.classList = 'flex gap-2';

            const viewBtn = document.createElement('button');
            viewBtn.classList = 'action-button movie-button movie-button-green';
            viewBtn.textContent = 'view';
            viewBtn.dataset.id = movie.data.id;
            viewBtn.dataset.action = 'view';
            viewBtn.dataset.caller = this.constructor.name; // pass the name of the Class
            viewBtn.addEventListener('click', (event) => this.#mainInstance.eventHandler(event));
            span.appendChild(viewBtn);

            const addBtn = document.createElement('button');
            addBtn.classList = 'action-button movie-button movie-button-green';
            addBtn.textContent = 'add';
            addBtn.dataset.id = movie.data.id;
            addBtn.dataset.action = 'add';
            addBtn.dataset.caller = this.constructor.name; // pass the name of the Class
            addBtn.addEventListener('click', (event) => this.#mainInstance.eventHandler(event));
            span.appendChild(addBtn);

            li.appendChild(span);

            ul.appendChild(li);
        });

        return ul;
    }
}

/**
 * a list for the favorite movies
 */
class MovieFavoritesList extends MovieList {
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
    #initialCall = '';
    #localStorageName = '';

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
        const url = this.#initialCall + '&api_key=' + this.#apiKey;

        console.info(`starting to load initial data from ${url}`);

        const results = fetch(url)
            // when wee get a response from TMDB pass the results on (make a JSON object out of it before)
            .then(response => response.json())
            // and then use the response data to to what we need
            .then(response => {
                console.info('finished loading initial data')
                // populate the  MovieList (the actual array of movies is stored in 'results')
                this.populateMovieList(response.results)
            })
            // and show errors if encounteered
            .catch(err => console.error(err));
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
        console.log(event.target.dataset);

        const dataset = event.target.dataset;

        switch (dataset.action) {
            case 'view':
                // show detail view
                this.renderView('details', dataset.caller, dataset.id);
                break;
            case 'add':
                // add movie to favorites
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

// set initial values
mainInstance.apiKey = '153a09fbeef547fb0435feeeb75d0140' // use it as url-parameter like 'api_key=153a09fbeef547fb0435feeeb75d0140'
mainInstance.pathToTmdb = 'https://api.themoviedb.org/3/movie'; // the main path to the movies
// mainInstance.pathToImages = 'https://image.tmdb.org/t/p/original'; // see readdme.md for other options
mainInstance.pathToImages = 'https://image.tmdb.org/t/p/w780'; // see readdme.md for other options
mainInstance.initialCall = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'; // the url params to call first
mainInstance.localStorageName = 'movieFavs';

// output-container for views
mainInstance.movieListView = '#movieList';
mainInstance.movieFavoritesListView = '#moviefavoritesList';
mainInstance.detailView = '#movieDetails';

// place the initial call 
mainInstance.fetchInitial();