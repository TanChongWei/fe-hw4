import { fetchJson } from "../../lib/fetch-json";
const BASE_URL = "https://ecomm-service.herokuapp.com"

export const getMovies = (page, signal) =>
    fetchJson(`${BASE_URL}/movie?page=${page}`, {
        signal,
    })
export const getMovieDetails = (movieId, signal) =>
    fetchJson(`${BASE_URL}/movie/movie/${movieId}`, {
        signal,
    })
export const getMovieComments = (movieId, signal) =>
    fetchJson(`${BASE_URL}/movie/movie/${movieId}/comment`, { signal })
