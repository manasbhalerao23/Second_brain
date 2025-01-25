import { useState } from "react"
import { Button } from "../components/button"
import { Card } from "../components/card"
import { CreateContentModel } from "../components/createcontentmodel"
import { PlusIcon } from "../icons/plusicon"
import { ShareIcon } from "../icons/shareicon"
import { SideBar } from "../components/sidebar"
import { usecontents } from "../hooks/usecontent"
import axios from "axios"
import { BACKEND_URL } from "../config"


function Dashboard() {
  const [openmodel, setopenmodel] = useState(false);
  const contents = usecontents();

  async function sharebrain(){
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
      share: true
    }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    const shareurl = `http://localhost:5173/share/${response.data.hashlink}`;
    await navigator.clipboard.writeText(shareurl);
    alert("link copied")
  }

  return (
    <div >
      <SideBar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModel open={openmodel} onclose={() => {setopenmodel(false);}}/>
        <div className="justify-end flex gap-4 ">
          <div className="items-center">
          <Button onclick={sharebrain} variant="secondary" text="Share Brain" StartIcon={<ShareIcon/>}></Button>
          </div>
        <Button onclick={() => {
            setopenmodel(true);
          }} variant="primary" text="Add Content" StartIcon={<PlusIcon/>}>
          </Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({type, link, title}) => 
            <Card type={type} title={title} link={link}></Card>)} 
          </div>
      </div>
    </div>
  )
}

export default Dashboard
