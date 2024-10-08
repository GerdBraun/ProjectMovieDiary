
export const initialData = {
    apiKey : '153a09fbeef547fb0435feeeb75d0140', // use it as url-parameter like 'api_key=153a09fbeef547fb0435feeeb75d0140'
    pathToTmdb : 'https://api.themoviedb.org/3/movie', // the main path to the movies
    // pathToImages : 'https://image.tmdb.org/t/p/original', // see readdme.md for other options
    // pathToImages : 'https://image.tmdb.org/t/p/w440_and_h660_face';, // see readdme.md for other options
    pathToImages : 'https://image.tmdb.org/t/p/w780', // see readdme.md for other options
    initialCall : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', // the url params to call first
    localStorageName : 'movieFavs',
    language : 'en-US',
    
    // output-container for views
    movieListView : '#movieList',
    movieFavoritesListView : '#movieFavoritesList',
    detailView : '#movieDetails',
    
}
