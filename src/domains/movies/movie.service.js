const BASE_URL = "https://ecomm-service.herokuapp.com"

export const getMovies = (page, signal) =>
    fetch(`${BASE_URL}/movie?page=${page}`, {
        signal,
    }).then((res) => res.json());
export const getMovieDetails = (movieId, signal) =>
    fetch(`${BASE_URL}/movie/movie/${movieId}`, {
        signal,
    }).then((res) => res.json());
export const getMovieComments = (movieId, signal) =>
    fetch(`${BASE_URL}/movie/movie/${movieId}/comment`, { signal }).then((res) => res.json());
