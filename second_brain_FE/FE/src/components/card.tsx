import { TwitterTweetEmbed } from "react-twitter-embed";
import { ShareIcon } from "../icons/shareicon";
import { Link } from "react-router-dom";

export function Card({type, title, link}: {
    type: "Youtube" | "Twitter";
    title: string;
    link: string;
}){
    const videoID = link.split('v=')[1]?.split('&')[0];
    const tweetID = link.split('status/')[1];
    return <div>
        <div className="p-8 bg-white rounded-md border-gray-200 max-w-72 border">
            <div className="flex justify-between">
                <div className="flex items-center font-medium">
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500" >
                        <Link to={link}>
                            <ShareIcon/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="pt-8">
                
            {type === "Youtube" && <iframe className="w-full" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            
            {type === "Twitter" && <TwitterTweetEmbed tweetId={tweetID}/>}
            
            </div>
        </div>
    </div>
}