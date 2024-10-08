// modules/storage.js

/**
 * saves an array of movie (objects) to the local storage 
 * @param {String} localStorageName the name of the local storage
 * @param {Array} arr the array to save
 */
export const saveListToLocalStorage = (localStorageName, arr) => {
    localStorage.setItem(localStorageName, JSON.stringify(arr));
}


/**
 * gets data from local storage
 * @param {String} localStorageName the name of the local storag
 * @returns {Array} an array of movie (objects) from the local storage 
 */
export const getListFromLocalStorage = (localStorageName) => {
    return JSON.parse(localStorage.getItem(localStorageName)) || [];
}

// data adapted from Besslan

/**
 * adds a movie to the local storage
 * @param {Movie} movie the movie to add
 */
export const addToStorage = (movie) => {
    const list = JSON.parse(localStorage.getItem("movieFavs")) || [];
    list.push(movie.data);
    localStorage.setItem("movieFavs", JSON.stringify(list));
};

/**
 * removes a movie to the local storage
 * @param {Movie} movie the movie to remove
 */
export const removeFromStorage = (movie) => {
    const list = JSON.parse(localStorage.getItem("movieFavs")) || [];
    const newlist = list.filter((item) => item.id !== movie.data.id);
    localStorage.setItem("movieFavs", JSON.stringify(newlist));
};

/**
 * checks if movie is already in local storage
 * @param {Movie} movie the movie to search for
 * @returns {Boolean}   
 */
export const checkInStorage = (movie) => {
    const list = JSON.parse(localStorage.getItem("movieFavs")) || [];
    const found = list.find((item) => item.id === movie.data.id);
    return !!found;
};