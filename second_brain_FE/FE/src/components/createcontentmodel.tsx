import axios, { AxiosError } from "axios";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { BACKEND_URL } from "../config";
import { CircleX, Clapperboard, FileText, Image, Link2, Plus, Twitter, X } from "lucide-react";

interface Inputdata{
title: string;
  link: string;
  type: string;
  newTag: string;
}

function CreateContentModel(){
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: {errors}
    } = useForm<Inputdata>({
        defaultValues:{
            type:"Image"
        },
    });
    const [isModelopen, setisModelopen]=  useState(false);
    const [tags, settags] = useState<{id: number, title: string}[]>([]);

    const onSubmit: SubmitHandler<Inputdata> = async(data) => {
        try{
            await axios.post(
                `${BACKEND_URL}/api/v1/content`,
                {
                    title: data.title,
                    link: data.link,
                    type: data.type,
                    tags: tags.map((t) => (t.title))
                },
                {
                    withCredentials: true
                }
            );

            setisModelopen(!isModelopen);
            window.location.reload();
        }
        catch(e){
            if (e instanceof AxiosError) {
                setError("root.serverError", { message: e.response?.data.error });
              }
        }
    };

    return(
        <>
        <button className="cursor-pointer bg-primary hover:bg-primary-dark transition-all duration-200 px-2 py-1 rounded-md text-sm font-medium flex justify-center items-center gap-2" onClick={() => setisModelopen(!isModelopen)}>
            <Plus size={16}/>
            Add Content
        </button>

        {isModelopen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center" onClick={()=>setisModelopen(!isModelopen)}>
                <div className="bg-gray-700 mx-5 py-4 rounded-md border-2 border-black-50" onClick={(e)=>e.stopPropagation()}>
                    <div className="flex w-full justify-between items-center mb-5">
                        <h1 className="text-2xl  font-bold">
                            Add new content
                        </h1>
                        <button className="cursor-pointer hover:bg-white/20 p-2 rounded-full transition-all duration-200" onClick={() => setisModelopen(!isModelopen)}>
                            <CircleX size={16}/>
                        </button>
                    </div>
                    
                    <form
                    className="flex flex-col md:w-lg"
                    onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="titleInput">Title</label>
                        <input 
                        type="text"
                        id="titleInput"
                        className="py-1 px-2 text-sm outline-1 outline-white/20 rounded-md bg-gray-500 mt-1 mb-5"
                        placeholder="Title"
                        required
                        {...register("title")}/>

                        <label htmlFor="linkInput">Link</label>
                        <input 
                        type="text"
                        id="linkInput"
                        className="py-1 px-2 text-sm outline-1 outline-white/20 rounded-md bg-gray-500 mt-1 mb-5"
                        placeholder="link"
                        required
                        {...register("link")}/>

                        <label>Tags</label>
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag) => (
                                <div
                                key={tag.id} className="bg-black/30 border-2 border-white/10 w-fit pl-4 px-1 py-1 rounded-full text-sm my-1 flex items-center justify-between gap-3 relative">
                                    {tag.title}
                                    <div
                                    className="hover:bg-white/10 rounded-full p-1 cursor-pointer" 
                                    onClick={() => {
                                        settags(tags.filter((t) => t.id !== tag.id))
                                    }}>
                                        <X size={12}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-start items-start gap-2 mt-1 mb-5">
                        <input
                            type="text"
                            className="py-1 px-4 outline-1 outline-white/20 rounded-full bg-gray-500 text-sm"
                            placeholder="New tag"
                            defaultValue={"#"}
                            {...register("newTag")}
                            />

                            <button
                            type="button"
                            className="bg-black/30 border-2 border-white/10 w-fit px-4 py-1 rounded-full text-sm flex justify-center gap-2 cursor-pointer"
                            onClick={() => {
                                const newTagvalue = getValues("newTag");
                                if(newTagvalue){
                                    settags((prev) => [
                                        ...prev,
                                        {
                                            id: Math.floor(Math.random() * Date.now()),
                                            title: newTagvalue.startsWith('#')
                                            ? newTagvalue
                                            : "#" + newTagvalue
                                        }
                                    ]);
                                }
                            }}>
                                <Plus size={16}/>
                                Add Tag
                            </button>
                        </div>

                        <label>Type</label>
                        <div className="flex flex-wrap justify-start items-center gap-3 mt-1 mb-5">
                            <TypeButton
                            register={register}
                            id={"Image"}
                            icon={<Image size={18} />}
                            />
                            <TypeButton
                            register={register}
                            id={"Video"}
                            icon={<Clapperboard size={18} />}
                            />
                            <TypeButton
                            register={register}
                            id={"Tweet"}
                            icon={<Twitter size={18} />}
                            />
                            <TypeButton
                            register={register}
                            id={"Document"}
                            icon={<FileText size={18} />}
                            />
                            <TypeButton
                            register={register}
                            id={"Link"}
                            icon={<Link2 size={18} />}
                            />
                        </div>

                        {errors.root?.serverError && (
                             <p className="text-primary text-left flex justify-start items-start gap-1 mb-5">
                             <CircleX size={14} className="mt-1" />
                             <span>{errors.root?.serverError.message}</span>
                           </p>
                        )}

                        <button type="submit" className="cursor-pointer bg-primary hover:bg-primary-dark transition-all duration-200 px-4 py-2 rounded-md">
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        )}
        </>
    );
}


const TypeButton = ({
    register,
    icon,
    id
} : {
    register: UseFormRegister<Inputdata>;
    icon: ReactElement;
    id: string;
}) => {
    return(
        <div>
           <input
                type="radio"
                id={id}
                value={id}
                className="peer hidden"
                {...register("type")}
            />
            <label
            className="hover:bg-white peer-checked:border-primary cursor-pointer bg-black/30 border-2 border-white/10 rounded-md w-fit flex justify-center items-center p-2 gap-2 text-sm"
            htmlFor={id}>
                {icon}
                <p>
                    {id}
                </p>
            </label>
        </div>
    );
};


export default CreateContentModel;