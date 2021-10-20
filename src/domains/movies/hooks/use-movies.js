import React from 'react';
import { useQuery } from 'react-query';
import { getMovieDetails, getMovies, getMovieComments } from '../movie.service';
import { useAuth } from '../../../domains/auth';

export const useMovies = () => {
    const [page, setPage] = React.useState(1);

    const query = useQuery(['movies', page], () => getMovies(page), {
        staleTime: 3000,
    });

    return {
        ...query,
        page,
        setPage,
    };
};

export const useMovieComments = (movieId) => {
    console.log('using comments')
    const [data, setData] = React.useState(undefined);
    const { accessToken } = useAuth();

    const loadData = (movieId) => getMovieComments(movieId).then(setData);

    React.useEffect(() => {
        if (accessToken) {
            const ab = new AbortController();
            loadData(movieId);

            return () => {
                ab.abort();
            };
        }
    }, [accessToken, movieId]);

    return {
        data,
        loadData: () => loadData(movieId),
    };
};

export const useMovieDetails = (movieId) => {
    return useQuery(['movieDetails', movieId], () => getMovieDetails(movieId), {
        staleTime: 3000,
    });
};