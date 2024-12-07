// TrailerButton.js
"use client";  // This ensures that this component is a Client Component

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function Trailer( {video, movie} ) {
    const [vd, setVd ] =  useState("");

    useEffect(() => {
        if (vd) {
            console.log("Updated video state:", vd);
        }
    }, [vd]);
   
    return (
        <div>
        <Dialog >
        <DialogTrigger> 
        <Button onClick={() => {
            console.log("hello")
            console.log(video)
            setVd(video);
            console.log(vd);
            }} variant="destructive" className="font-normal ms-16 rounded-lg">
            Watch trailer
        </Button>
        </DialogTrigger>
        
<DialogContent >
{vd ? ( <div className="">
    <iframe
                    className="rounded-md"
                    width="640px"
                    height="360px"
                    left="0"
                    top="0"
                    src={`https://www.youtube.com/embed/${vd}?autoplay=1`}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
    </div>) : <></>}
    </DialogContent>
    </Dialog>
    </div>
   
    )
}
