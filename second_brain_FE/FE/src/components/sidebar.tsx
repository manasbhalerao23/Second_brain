import { Logo } from "../icons/logo";
import { TwitterIcon } from "../icons/twittericon";
import { SideBarItem } from "./sidebaritem";

export function SideBar(){
    return <div className="h-screen bg-white border-r w-72 left-0 top-0 fixed pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-indigo-600">
            <Logo/>
            </div>
            Second Brain
        </div>
        <div className="pt-8 pl-4 ">
            <SideBarItem icon={<TwitterIcon/>} title={"Tweets"}></SideBarItem>
        </div>
    </div>
}