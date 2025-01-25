import { ReactElement } from "react"

export function SideBarItem({icon, title}: {
    icon: ReactElement;
    title: String;
    }){
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded pl-4 max-w-48">
        <div className="pr-2">
        {icon} 
        </div>
        <div>
        {title}
        </div>
    </div>
}