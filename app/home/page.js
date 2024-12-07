import MovieList from "@/components/MovieList";
import { Button } from "@/components/ui/button";
import { AwardIcon } from "lucide-react";
import Link from "next/link";
import { requestToken } from "../page";
import { UserProvider } from "../authProvider";

async function fetchPopular() {
    const token = process.env.TMDB_TOKEN;

    const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}



export async function sessionId () {
    const token = process.env.TMDB_TOKEN;
    console.log(token)
    const tokenData = await requestToken(); // Renamed the variable here to avoid conflict
    const tokenRq = tokenData.request_token;
    console.log("Req token:", tokenRq)
    const res = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
        method: 'POST',  
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({request_token : tokenRq})
    });
    return await res.json();
}




export default async function Home() {
	const popular = await fetchPopular();
    
    const session = await sessionId();
    console.log(session);

    
   
	
    return (
		<>
			<h2 className="text-lg font-bold mb-4 pb-2 border-b">Popular</h2>
			<MovieList  movies={popular.results}/>
			
             {/* <a href={`https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000`}>
                <Button>Click</Button>
             </a> */}
		</>
	);
}