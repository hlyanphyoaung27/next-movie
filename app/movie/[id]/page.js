

import MovieList from "@/components/MovieList";
import Trailer from "@/components/Trailer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AwardIcon } from "lucide-react";
import Link from "next/link";




const token = process.env.TMDB_TOKEN;

    async function fetchMovie(id) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return await res.json();
    }

async function fetchTrailer(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}

async function fetchCredit(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}

async function fetchProduction(id) {
    const res = await fetch(`https://api.themoviedb.org/3/company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}

async function MovieReviews(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}


export default async function Movie({ params }) {
    const { id } = params;
    const movie = await fetchMovie(id);

    const credits = await fetchCredit(id);
    const trailer = await fetchTrailer(id);
    // const [vd , setvd ] = useState("");

    const video = trailer.results.find(a => a.type === "Trailer").key;
    const productionId = await movie.production_companies[0];

    const production = await fetchProduction(productionId.id);
    console.log('Production:', production);

    const reviews = await MovieReviews(id);
    console.log("Reviews:", reviews)





    console.log(trailer.results.find(a => a.type === "Trailer").key );


    const backdrop = "http://image.tmdb.org/t/p/w1280";
    const profile = "http://image.tmdb.org/t/p/w185";
    const poster = "http://image.tmdb.org/t/p/w342";
    const productionLogo = "http://image.tmdb.org/t/p/w185";

    return (
        <div>


            <div className="absolute items-center">
                <img className="w-full backdrop-blur-sm" src={backdrop + movie.backdrop_path} alt={`${movie.title} backdrop`} />
                <div class="absolute inset-0 bg-black  bg-opacity-70"></div>
            </div>
            <div className="relative px-11 py-8 w-[800px] items-center">
                <div className="mb-4 font-bold text-white">
                    {movie.title} ({movie.release_date.split("-")[0]})
                </div>
                <div className="flex gap-2 mb-4">
                    {movie.genres.map((genre) => (
                        <Badge variant="secondary" key={genre.id}>{genre.name}</Badge>
                    ))}
                </div>
                <div className="flex" >


                    <img className=" w-[250px] py-4 rounded-md" src={poster + movie.poster_path} />
                    <div className="ms-12 my-4 font-normal text-white">
                        <Badge variant="secondary" className="mb-4 drop-shadow-md">Overview</Badge>
                        <p>
                            {movie.overview}
                        </p>

                    </div>
                </div>
                <Trailer video={video} movie={movie} className="" />

            </div>






            {/* Casts */}

            <h1 className="font-semibold mt-16 border-b-2 py-1 w-[50px]">Casts</h1>
            <ScrollArea className=" whitespace-nowrap rounded-md border-y-2 inline">
                <div className="flex w-[1100px]  mt-3 space-x-4 p-4">
                    {credits.cast.map((person) => (
                        <div className="w-[185px]  text-center py-4 px-2 flex flex-col gap-4 border rounded-md" key={person.id}>
                            {person.profile_path ? (
                                <div className="justify-center flex">
                                    <img className="rounded-full  w-[130px] h-[130px]" src={profile + person.profile_path} alt={`${person.name}`} />
                                </div>
                            ) : (
                                <div className="w-[130px] h-[130px] rounded-full bg-gray-700">
                                    <div className="w-[75px] h-[75px]">{person.name[0]}</div>
                                </div>
                            )}

                            <div className="mb-2  w-[180px]">
                                <b className="block ">
                                    <Link href={`/person/${person.id}`}>{person.name}</Link>
                                </b>
                                <span className="text-gray-500 ">{person.character}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Production company */}
            <div className="mt-6">
                <h1 className="font-semibold border-b-2 py-2 w-[180px]">Production Company</h1>
                <div className="mt-4">  
                    <div className="bg-white w-[260px] items-center px-1 rounded-md mb-2">
                        <img className=" w-[250px] py-4 rounded-md mb-2" src={productionLogo + production.logo_path} /> 
                    </div>
                    <div className="mb-2">
                        <div className="mb-2 font-normal flex">
                            <h2 className="font-bold">Name -</h2>
                            <h3 className = "ms-2">{production.name}</h3>
                        </div>
                        <div className="mb-2 font-normal flex">
                            <h2 className="font-bold">Origin -</h2>
                            <h3 className = "ms-2">{production.headquarters}</h3>
                        </div>
                        <div className="mb-2 font-normal flex">
                            <h2 className="font-bold">Page -</h2>
                            <a href={production.homepage} className="ms-2">{production.homepage}</a>
                        </div>
                        <div className="flex"> 
                            <h2 className="font-bold">Description</h2>
                            <h3 className = "ms-2 font-normal"> - {production.description}</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    );
}
