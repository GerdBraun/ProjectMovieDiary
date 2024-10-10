// modules/network.js

/**
 * the initial fetch from TMDB (retrieves the first page of results based on the initial path)
 */
export const fetchInitial = (caller) => {
    const url = caller.initialCall + '&api_key=' + caller.apiKey;

    console.info(`starting to load initial data from ${url}`);

    const results = fetch(url)
        // when wee get a response from TMDB pass the results on (make a JSON object out of it before)
        .then(response => response.json())
        // and then use the response data to to what we need
        .then(response => {
            console.info('finished loading initial data')

            // populate the  MovieList (the actual array of movies is stored in 'results')
            caller.populateMovieList(response.results);
            
            return(response.results)
        })
        // and show errors if encounteered
        .catch(err => console.error(err));
}

export const fetchMovieDetails = (caller, id) => {
    // TODO: use real data!
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=153a09fbeef547fb0435feeeb75d0140&append_to_response=credits`;
    const results = fetch(url)
        .then(response => response.json())
        .then(response => {
            //console.info('finished loading getMovieDetails')
            console.log('network.js: fetchMovieDetails -> ', response)

            caller.populateMovieDetails(response);
            return response;
        })
        // and show errors if encounteered
        .catch(err => console.error(err));
    //return data;
}
