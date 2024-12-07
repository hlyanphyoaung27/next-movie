'use client'
import { useAuth } from "@/app/authProvider"
import MovieList from "./MovieList";
import { Button } from "./ui/button";

export default function Homepage({movies, token}) {
    const {userID, setUserID} = useAuth();
    return (
        <>
        <h2 className="text-lg font-bold mb-4 pb-2 border-b">Popular</h2>
        {/* <MovieList movies={popular.results}/> */}
       {userID ? (<MovieList movies={movies}/>) : ( <a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/home`}>
            <Button>Click</Button>
        </a>)}
    </>
    )
}