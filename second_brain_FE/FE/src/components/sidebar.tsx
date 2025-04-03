import axios from "axios";
import { AlignJustify, Clapperboard, FileText, Image, Layers, Link2, LogOut, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { currentTabAtom } from "../atoms/contentAtom";
import {motion} from "framer-motion";

function SideBar({ isvisible, setisvisible }: { isvisible: boolean; setisvisible: (visibility: boolean) => void; }) {
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
        try {
            axios.post(`${BACKEND_URL}/logout`);
            localStorage.removeItem("isblogin");
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    if (!isvisible) {
        return (
            <button className="p-2 absolute md:static hover:bg-white/20 rounded-r-full py-1 self-start mt-5 cursor-pointer transition-all duration-200" onClick={() => setisvisible(!isvisible)}>
                <AlignJustify />
            </button>
        );
    }

    return (
        <motion.div 
            initial={{ x: -200, opacity: 0 }} 
            animate={isvisible ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }} 
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed md:sticky top-0 w-64 bg-gray-800 text-gray-200 h-screen px-5 py-3 border-r border-gray-700 flex flex-col"
        >
            <div className="flex justify-between items-center w-full mb-4">
                <Link to={'/'} className="text-xl font-bold text-white">Second Brain</Link>
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-700 rounded-full transition-all duration-200" 
                    onClick={() => setisvisible(!isvisible)}
                >
                    <AlignJustify size={22} />
                </motion.button>
            </div>

            <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, ease: "easeInOut" }}
                className="flex flex-1 flex-col gap-2"
            >
                {tabs.map((tab, index) => (
                    <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <TabButton title={tab.title} icon={tab.icon} />
                    </motion.div>
                ))}
            </motion.ul>

            {localStorage.getItem("isblogin") && (
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center justify-center gap-2 w-full mt-auto px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition-all duration-200" 
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    Logout
                </motion.button>
            )}
        </motion.div>
    );
}

function TabButton({ title, icon }: { title: string; icon: ReactElement; }) {
    const [currentTab, setcurrentTab] = useRecoilState(currentTabAtom);

    return (
        <li
            className={`w-full px-3 py-2 flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-md ${currentTab === title ? "bg-white text-black" : "hover:bg-white/10"}`}
            onClick={() => setcurrentTab(title)}>
            {icon}
            <span className="text-sm font-medium">{title}</span>
        </li>
    );
}

export default SideBar;
