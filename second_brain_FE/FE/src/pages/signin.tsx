
import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        });
        const jwt = response.data.token;
        localStorage.setItem('token', jwt);
        navigate("/dashboard");
    }
    return <div className="bg-black-100 h-screen w-screen bg-black flex justify-center items-center">
        <div className="bg-black-50 border-black-50 rounded-xl border w-1/4 p-8 h-2/3">
            <div className="justify-items-center text-white">
            <h1>
                Login Here
            </h1>
            </div>
            <div className="">
            <Input reference={usernameRef} placeholder="Username"/>
            <Input reference={passwordRef} placeholder="Password"/>
            </div>
            <div className="flex justify-center p-4">
            <Button onclick={signin} variant="primary" text={"Signin"}/>
            </div>
        </div>
    </div>
}