import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { CircleX, Copy, Share2 } from "lucide-react";

function ShareModel() {
    const [ismodelopen, setismodelopen] = useState<boolean>(false);

    async function handlecopylink(){
        try{
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                    share: true
                },
                {
                    withCredentials: true
                }
            );

            navigator.clipboard.writeText(response.data.link);
            setismodelopen(!ismodelopen);
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <>
        <button className="cursor-pointer bg-primary/20 hover:bg-primary-dark border-2 border-primary transition-all duration-200 px-2 py-1 rounded-md text-sm font-medium flex justify-center items-center gap-2" onClick={() => setismodelopen(!ismodelopen)}>
            <Share2 size={16}/>
            Share Brain
        </button>
        {
            ismodelopen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center" onClick={()=>setismodelopen(!ismodelopen)}>
                    <div className="bg-gray-700 mx-5 px-4 py-4 rounded-md border-2 border-white/10 flex flex-col justify-center" onClick={(e)=>e.stopPropagation()}>
                        <div className="flex w-full justify-between items-start mb-3">
                            <h1 className="text-2xl font-bold">
                                Share your second brain
                            </h1>
                            <button className="cursor-pointer hover:bg-white/20 p-2 rounded-full transition-all duration-200" onClick={() => setismodelopen(!ismodelopen)}>
                                <CircleX/>
                            </button>
                        </div>
                        <p className="text-gray-300 max-w-md">
                            shared brain can be used by other also
                        </p>
                        <button 
                        className="cursor-pointer bg-primary hover:bg-primary-dark transition-all duration-200 px-2 py-1 rounded-md mt-5 flex gap-3 justify-center items-center"
                        onClick={handlecopylink}>
                            <Copy size={16}/>
                            Copy link
                        </button>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default ShareModel;