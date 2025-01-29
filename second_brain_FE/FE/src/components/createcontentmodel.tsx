import { useRef, useState } from "react";
import { CrossIcon } from "../icons/crossicon";
import { Input } from "./input";
import { Button } from "./button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function CreateContentModel({open, onclose}: {
    open: Boolean;
    onclose: () => void;
}){
    enum contenttype {
        Youtube = "Youtube",
        Twitter = "Twitter"
    }
    const linkRef = useRef<HTMLInputElement>();
    const titleRef = useRef<HTMLInputElement>();
    const [type, settype] = useState(contenttype.Youtube);

    async function createcontent(){
        const link = linkRef.current?.value;
        const title = titleRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            type,
            title
        }, {
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        onclose();
    }
    return <div>
            {open && <div className="bg-opacity-65 w-screen h-screen bg-slate-500 fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white p-4 rounded">
                        <div className="flex justify-end">
                            <div onClick={onclose} className="cursor-pointer">
                            <CrossIcon/>
                            </div>
                        </div>
                        <div className="">
                            <Input reference={titleRef} placeholder={"Title"}/>
                            <Input reference={linkRef} placeholder={"Link"}/>
                        </div>
                        <h1>Type</h1>
                        <div className="flex">
                            <Button text={"Youtube"} variant={type === contenttype.Youtube ? "primary" : "secondary"} onclick={() => settype(contenttype.Youtube)}/>
                            <Button text={"Twitter"} variant={type === contenttype.Twitter ? "primary" : "secondary"} onclick={() => settype(contenttype.Twitter)}/>
                        </div>
                        <div className="flex justify-center">
                            <Button onclick={createcontent} variant="primary" text={"Submit"}/>
                        </div>
                    </span>
                </div>
            </div>}
        </div>
}
