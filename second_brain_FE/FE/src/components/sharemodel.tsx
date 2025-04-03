import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { CircleX, Copy, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShareModel() {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    
    async function handleCopyLink() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                { withCredentials: true }
            );
            navigator.clipboard.writeText(response.data.link);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <button 
                className="cursor-pointer bg-primary/20 hover:bg-primary-dark border-2 border-primary transition-all duration-200 px-3 py-2 rounded-lg text-sm font-medium flex justify-center items-center gap-2"
                onClick={() => setIsModelOpen(true)}
            >
                <Share2 size={16} />
                Share Brain
            </button>
            
            <AnimatePresence>
                {isModelOpen && (
                    <motion.div 
                        className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-md flex justify-center items-center" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModelOpen(false)}
                    >
                        <motion.div 
                            className="bg-gray-800 px-6 py-6 rounded-2xl border border-white/10 flex flex-col justify-center shadow-lg w-full max-w-sm"
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex w-full justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-white">Share Your Second Brain</h1>
                                <button 
                                    className="cursor-pointer hover:bg-white/20 p-2 rounded-full transition-all duration-200" 
                                    onClick={() => setIsModelOpen(false)}
                                >
                                    <CircleX />
                                </button>
                            </div>
                            <p className="text-gray-400 text-sm mb-5">
                                Share your brain with others to collaborate effortlessly.
                            </p>
                            <button 
                                className="cursor-pointer bg-primary hover:bg-primary-dark transition-all duration-200 px-3 py-2 rounded-lg flex gap-3 justify-center items-center w-full text-white font-medium"
                                onClick={handleCopyLink}
                            >
                                <Copy size={16} />
                                {isCopied ? "Copied!" : "Copy Link"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ShareModel;
