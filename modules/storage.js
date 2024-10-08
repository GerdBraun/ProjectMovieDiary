// modules/storage.js

/**
 * saves an array of movie (objects) to the local storage 
 * @param {String} localStorageName the name of the local storage
 * @param {Array} arr the array to save
 */
export function saveListToLocalStorage(localStorageName, arr) {
    localStorage.setItem(localStorageName, JSON.stringify(arr));
}


/**
 * gets data from local storage
 * @param {String} localStorageName the name of the local storag
 * @returns {Array} an array of movie (objects) from the local storage 
 */
export function getListFromLocalStorage(localStorageName) {
    return JSON.parse(localStorage.getItem(localStorageName)) || [];
}

