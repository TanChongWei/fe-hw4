import React from 'react';
import { Link } from 'react-router-dom';

const Badge = ({ children }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        {children}
    </span>
);

export const MovieItem = (props) => {
    const { _id, adult, title, releaseDate, posterUrl } = props;

    return (
        <div className="relative flex flex-col">
            <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-pink-500 overflow-hidden">
                <img
                    src={posterUrl}
                    alt=""
                    className="object-cover pointer-events-none group-hover:opacity-75 h-48 w-full"
                />
                <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                >
                    <span className="sr-only"> </span>
                </button>
            </div>
            <div className="flex-1 flex md:flex-col justify-between items-start md:items-stretch gap-3 px-2">
                <div className="mt-1 flex-1">
                    <div className="flex justify-between items-center gap-3">
                        {adult ? <Badge>Adult</Badge> : null}
                    </div>
                    <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
                        {title}
                    </p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                        {releaseDate}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 py-3">
                <Link
                to={`/movies/${_id}`}
                className="text-sm px-4 py-1 text-pink-500 border-2 border-red-500"
                >
                View details
                </Link>
                </div>
            </div>
        </div>
    );
};
