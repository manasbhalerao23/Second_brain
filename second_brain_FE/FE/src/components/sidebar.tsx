import axios from "axios";
import { AlignJustify, Clapperboard, FileText, Image, Layers, Link2, LogOut, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { currentTabAtom } from "../atoms/contentAtom";

function SideBar({
    isvisible,
    setisvisible
} : {
    isvisible: boolean;
    setisvisible: (visibility: boolean) => void;
}) {
    const navigate = useNavigate();
    const tabs = [
        { title: "All", icon: <Layers size={18} /> },
        { title: "Image", icon: <Image size={18} /> },
        { title: "Video", icon: <Clapperboard size={18} /> },
        { title: "Tweet", icon: <Twitter size={18} /> },
        { title: "Document", icon: <FileText size={18} /> },
        { title: "Link", icon: <Link2 size={18} /> },
    ];

    async function handleLogout() {
        try{
            axios.post(`${BACKEND_URL}/logout`);
            localStorage.removeItem("isblogin");

            navigate('/');
        }
        catch(e){
            console.log(e);
        }
    }

    if(!isvisible){
        return(
            <button className="absolute md:static hover:bg-white/20 rounded-r-full py-1 self-start mt-5 cursor-pointer"
            onClick={() => setisvisible(!isvisible)}>
                <AlignJustify/>
            </button>
        );
    }

    return (
        <div className="fixed md:sticky top-0 w-full md:w-1/5 bg-gray-700 text-gray-200 h-screen px-4 py-2 border-r-2 border-r-black/10 transition-all flex flex-col">
            <h1 className="w-full text-lg font-semibold text-black-50 cursor-pointer my-3 flex justify-between items-center">
                <Link to={'/'}>Second Brain</Link>
                <div className="hover:bg-black/20 rounded-full transition-all duration-200"
                onClick={() => setisvisible(!isvisible)}>
                    <AlignJustify/>
                </div>
            </h1>
            
            <ul className="flex flex-1 flex-col justify-start items-start gap-2 font-medium">
                {tabs.map((tab,index) => (
                    <TabButton key={index} title={tab.title} icon={tab.icon}/>
                ))}
            </ul>

            {localStorage.getItem("isblogin") && (
                    <button className="items-center justify-center flex gap-2 w-full mt-auto px-2 py-1 cursor-pointer transition-all duration-200 rounded-md bg-primary/20 text-center text-sm hover:bg-primary text-red-700 hover:text-red-500"
                    onClick={handleLogout}>
                        <LogOut/>
                        Logout
                    </button>
            )}
        </div>
    );
}

function TabButton({title, icon}: {
    title: string;
    icon: ReactElement;
}) {
    const [currentTab, setcurrentTab] = useRecoilState(currentTabAtom);

    return(
        <li
        className={`w-full px-2 py-1 flex items-center gap-2 cursor-pointer transition-all duration-200 rounded-md ${currentTab === title ? "bg-white text-black" : "hover:bg-white/5"}`}
        onClick={() => setcurrentTab(title)}>
            {icon}
            {title}
        </li>
    );
}

export default SideBar;