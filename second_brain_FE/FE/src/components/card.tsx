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
            <div>
                <div>
                    <div>
                        <p>{getIcon()}</p>
                        <p>
                            {content.title}
                        </p>
                    </div>
                    {!shared && (<div onClick={handledelete}>
                        <Trash size={16}/>
                        </div>)}
                </div>

                <a
                target="blank"
                href={content.link}
                className="">
                    {content.link}
                </a>

                {content.type === "Image" && (
                    <img alt="" src={content.link} className=""/>
                )}

                {/* check for youtube embed */}
                {content.type === "Video" && (
                    <iframe
                    src={`https://youtube.com/embed/${
                        content.link.split("https://youtube/")[1]
                    }`}
                    className=""/>
                )}


                {content.type === "Tweet" && (
                    <div className="">
                        <blockquote
                        className=""
                        style={{margin:0}}>
                            <a
                            href={`https://twitter.com/x/status/${
                                content.link.split("/status/")[1]
                            }`}>
                            </a>
                        </blockquote>
                    </div>
                )}

                <div>
                    {content.tags.map((tag,index) => (
                        <p
                        key={index}
                        className="">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
);

export default Card;