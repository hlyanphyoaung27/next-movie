import MovieList from "@/components/MovieList";
import { Button } from "@/components/ui/button";
import { AwardIcon } from "lucide-react";
import Link from "next/link";

import Homepage from "@/components/Homepage";

async function fetchPopular() {
    const token = process.env.TMDB_TOKEN;

    const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}

export async function requestToken() {
	const token = process.env.TMDB_TOKEN;
	const res = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}



export default async function Home() {
	const popular = await fetchPopular();
    const token = await requestToken();
    const tokenRq = token.request_token;
    console.log("Token:", tokenRq);
	

    return (
		<>
            <Homepage movies={popular.results} token={tokenRq}/>
		</>
	);
}
