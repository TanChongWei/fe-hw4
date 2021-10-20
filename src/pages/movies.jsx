import { MovieItem, useMovies } from '../domains/movies';


export const Movies = () => {
    const {data, page, setPage} = useMovies()
    console.log("data Items", data)

    return (
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                    Movies
                </h1>
            </div>
            <div className="bg-gray-50 lg:flex">
                <div className="flex-1">
                    {data && (
                        <div className="grid md:grid-cols-3">
                            {data.map((item) => (
                                <MovieItem {...item} key={item._id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <button onClick={() => setPage(page-1)}>
                    Previous Page
                </button>
                <button onClick={() => setPage(page+1)}>
                    Next Page
                </button>
            </div>
            {!data && (
                <div className="p-12 text-center text-3xl">Loading...</div>
            )}
        </div>
    );
};
