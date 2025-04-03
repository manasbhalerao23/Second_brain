import { memo } from "react";
import { contentdata } from "../types";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Clapperboard, FileText, Image, Link2, Trash, Twitter } from "lucide-react";

const Card = memo(
    ({content, shared} : {content: contentdata; shared: boolean}) => {
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
                window.location.reload();
            }
            catch(e){
                console.log(e);
            }
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
                    <img alt="" src={content.link} className="rounded-md"/>
                )}

                {/* check for youtube embed */}

                {content.type === "Video" && (
                    <iframe
                    src={`https://youtube.com/embed/${
                        content.link.split("https://youtube/")[1]
                    }`}
                    className="w-full h-full rounded-md"/>
                )}


                {content.type === "Tweet" && (
                    <div className="hidden md:block">
                        <blockquote
                        className="twitter-tweet w-full h-full"
                        style={{margin:0}}>
                            <a
                            href={`https://twitter.com/x/status/${
                                content.link.split("/status/")[1]
                            }`}>
                            </a>
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