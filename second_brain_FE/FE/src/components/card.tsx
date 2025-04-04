import { memo, useEffect } from "react";
import { contentdata } from "../types";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Clapperboard, FileText, Image, Link2, Trash, Twitter } from "lucide-react";

const Card = memo(
    ({content, shared} : {content: contentdata; shared: boolean}) => {
        
        useEffect(() => {
            const interval = setInterval(() => {
                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.load();
                    clearInterval(interval);
                  }
                },300);
                return () => clearInterval(interval);
            }, []);

        async function handledelete () {
            try{
                await axios.delete(`${BACKEND_URL}/api/v1/content`,
                    {
                        data:{
                            id: content.id,
                        },
                        withCredentials: true
                    }
                );
                console.log(content.id);
                //window.location.reload();
            }
            catch(e){
                console.log(e);
            }
        }

        function getYoutubeEmbed (url: string) {
            const standard = url.match(/(?:youtube\.com\/watch\?v=)([^&]+)/);
            if(standard) return standard[1];

            const short = url.match(/(?:youtu\.be\/)([^?&]+)/);
            if(short) return short[1];

            return null;
        }

        function getIcon() {
            switch(content.type){
                case "Image":
                    return <Image size={16}/>;
                case "Video":
                    return <Clapperboard size={16}/>;
                case "Tweet":
                    return <Twitter size={16}/>;
                case "Document":
                    return <FileText size={16}/>;
                case "Link":
                return <Link2 size={16}/>;
            }
        }

        return(
            <div className="h-full text-gray-200 bg-gray-700 border-2 border-white/10 px-4 py-2 rounded-md flex flex-col justify-start items-start gap-5">
                <div className="w-full flex justify-between items-start gap-3">
                    <div className="flex justify-center items-start gap-3">
                        <p className="pt-1">{getIcon()}</p>
                        <p className="text-lg font-medium break-words line-clamp-3">
                            {content.title}
                        </p>
                    </div>
                    {!shared && (<div 
                    className="hover:bg-white/20 rounded-full p-1 transition-all duration-200 cursor-pointer"
                    onClick={handledelete}>
                        <Trash size={16}/>
                        </div>)}
                </div>

                <a
                target="blank"
                href={content.link}
                className="break-all line-clamp-2">
                    {content.link}
                </a>

                {content.type === "Image" && (
                    <img alt="" src={content.link} className="rounded-md w-full object-cover"/>
                )}

                {/* check for youtube embed */}

                {content.type === "Video" && (() => {
                    const videoId = getYoutubeEmbed(content.link);
                    
                    return videoId ? (
                        <div className="w-full max-h-[150px] overflow-hidden">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            className="w-full h-full rounded-md"
                            allowFullScreen
                        />
                    </div>
                    ) : null
                }
                )()}


                {content.type === "Tweet" && (
                    <div className="hidden md:block overflow-hidden max-h-[150px]">
                        <blockquote
                        className="twitter-tweet w-full"
                        style={{margin:0}}>
                            <a
                            href={`https://twitter.com/x/status/${
                                content.link.split("/status/")[1]
                            }`}>
                            </a>
                            {/* easy way */}
                            {/* <a
                            href={content.link}>
                            </a> */}
                        </blockquote>
                    </div>
                )}

                <div className="flex flex-wrap gap-3">
                    {content.tags.map((tag,index) => (
                        <p
                        key={index}
                        className="bg-primary/20 border-2 border-primary w-fit px-4 py-1 rounded-full text-sm">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
);

export default Card;