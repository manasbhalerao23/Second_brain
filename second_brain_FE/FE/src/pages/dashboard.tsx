import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { currentTabContentsf } from "../atoms/contentAtom";
import { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import CreateContentModel from "../components/createcontentmodel";
import { contentdata } from "../types";
import Card from "../components/card";
import ShareModel from "../components/sharemodel";
import { CardSkeleton } from "../components/cardSkeleton";

function Dashboard() {
  const navigate = useNavigate();
  const params = useParams();
  const contentsState = useRecoilValueLoadable(
    currentTabContentsf(params.shareId || null)
  );
  const [sidebarvisible,setsidebarvisible] = useState(true);

  useEffect(()=>{
    if(!localStorage.getItem("isblogin") && !params.shareId){
      navigate('/');
    }
  },[]);


  return(
    <main className="min-h-screen flex bg-black-100 text-white font-primary">
      <SideBar
      isvisible={sidebarvisible}
      setisvisible={setsidebarvisible}
      />
      <div className="w-full flex flex-col justify-start items-start mx-5 mb-5">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-5">
          <h1 className="text-3xl font-semibold text-white my-6">
            {contentsState.contents.username || "Your"} Contents
          </h1>
          {params.shareId ? (
            localStorage.getItem("isblogin") && (
              <button className="cursor-pointer bg-primary/20 hover: bg-primary-dark border-2 border-primary transition-all duration-200 px-2 py-1 rounded-md text-sm font-medium flex justify-center items-center gap-2">
                <Link to={'/brain'}>Your Brain</Link>
              </button>
            )
          ) : (
            <div className="flex justify-center items-center gap-3">
              <ShareModel/>
              <CreateContentModel/>
            </div>
          )}
        </div>

        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contentsState.state === "loading" ? (
            <>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            </>
          ) : contentsState.state === "hasError" ? (
            <div>error while fetching</div>
          ): contentsState.contents?.contents?.length === 0 ? (
            <div>Empty Brain</div>
          ) : (
            contentsState.contents?.contents?.map((content: contentdata) => (
              <Card
              key={content.id}
              content={content}
              shared={params.shareId ? true : false}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default Dashboard;