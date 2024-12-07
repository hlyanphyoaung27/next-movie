"use client"

import { useAuth } from "@/app/authProvider";
import Link from "next/link"



export default function MovieList({movies}) {
    const poster = "http://image.tmdb.org/t/p/w342";
	const {userID, setUserID}  = useAuth();
	console.log("hello name:", userID)
	
    return (
		<div>
			{!userID? (
				<>hello</>
			) :  <div className="flex flex-wrap gap-4">
			{movies.map(movie => {
				return (
					<div className="w-[200px] text-center" key={movie.id}>
						<Link href={`/movie/${movie.id}`}>
							<img className="hover:scale-105 transition-all" src={poster + movie.poster_path}/>
						</Link>
						<div className="mt-2">{movie.title}</div>
						<span className="text-gray-600">
							{movie.release_date.split("-")[0]}
						</span>
					</div>
				)
			})}
		</div>}
		</div>
    )
}