import { useState } from 'react';
import { useMovieDetails, useMovieComments } from '../hooks/use-movies.js';
import { Button } from '../../../components/button';
import { Select } from '../../../components/select';
import { useAuth } from '../../../domains/auth';
import { Link } from 'react-router-dom';
import { useActiveUser } from '../../../domains/auth/hooks/use-activeuser.js';

const BASE_URL = "https://ecomm-service.herokuapp.com"

export const MovieDetails = ({ movieId }) => {
    const movieDetails = useMovieDetails(movieId);
    const { data } = movieDetails;
    const { status, accessToken } = useAuth();

    const user = useActiveUser();
    const { comments, loadData } = useMovieComments(movieId);
    

    const [commentRating, setCommentRating] = useState(5);
    const [comment, setComment] = useState('');

    const addComment = () => {
        console.log('adding comment')
        console.log(accessToken)
        fetch(BASE_URL + '/movie/comment', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body:  {
                rating: parseInt(commentRating),
                movieId,
                content: comment,
            },
        }).then(res => res.json())
        .then(() => {
            setCommentRating(5);
            setComment('');
            loadData();
        });
    };

    const deleteComment = (commentId) =>
        fetch(BASE_URL + '/movie/comment/' + commentId, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(res => res.json());
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="lg:max-w-lg lg:self-end">
                    <div className="mt-4">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {data && data.title}
                        </h1>
                    </div>

                    <section
                        aria-labelledby="information-heading"
                        className="mt-4"
                    >
                        <h2 id="information-heading" className="sr-only">
                            Movie details
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">
                                Overview: {data && data.overview}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">
                                Release Date: {data && data.releaseDate}
                            </p>
                        </div>

                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">
                                Adult-rated: {data && String(data.adult)}
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img
                            src={data && data.posterUrl}
                            alt="Movie Poster"
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                </div>

                <div className="lg:max-w-lg lg:self-end">
                    <div className="mt-4">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Comments
                        </h1>
                    </div>

                    <section
                        aria-labelledby="information-heading"
                        className="mt-4"
                    >
                        {comments && comments.length > 0 ? (
                            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {comments.map((comment) => (
                                    <li key={comment._id} className="flex py-6">
                                        <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h4 className="text-sm">
                                                        <p className="font-medium text-gray-700 hover:text-gray-800">
                                                            {comment.userName}
                                                        </p>
                                                    </h4>
                                                    <p className="ml-4 text-sm font-medium text-gray-900">
                                                        {`Rating: ${comment.rating}`}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {comment.content}
                                                </p>
                                            </div>

                                            <div className="mt-4 flex-1 flex items-end justify-end">
                                                <div className="ml-4">
                                                    {comment.userId ===
                                                    user.data.userId ? (
                                                        <button
                                                            type="button"
                                                            className="text-sm font-medium text-pink-600 hover:text-pink-500"
                                                            onClick={() =>
                                                                deleteComment(
                                                                    comment._id
                                                                ).then(() =>
                                                                    loadData()
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                Delete Your
                                                                Comment
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        `${comment.userId} v ${user.data.userId}`
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No comments to display.</p>
                        )}
                    </section>
                </div>

                <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                    <form>
                        <div className="p-3">New Comment</div>
                        <div className="space-y-5 p-3">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium"
                                >
                                    Comment
                                </label>
                                <input
                                    type="content"
                                    id="content"
                                    value={comment}
                                    onChange={(ev) => {
                                        setComment(ev.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="rating"
                                    className="block text-sm font-medium"
                                >
                                    Rating out of 5
                                </label>
                                <Select
                                    id="rating"
                                    value={commentRating}
                                    onChangeValue={(e) => {
                                        console.log(e);
                                        setCommentRating(e);
                                    }}
                                    required
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Select>
                            </div>
                        </div>
                    </form>

                    <div className="mt-10">
                        {status === 'authenticated' ? (
                            <Button
                                onClick={() => addComment()}
                                variant="primary"
                                className="w-full"
                            >
                                Add Comment
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                render={() => <Link to={`/login`}>LOGIN</Link>}
                            ></Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
