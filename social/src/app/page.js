'use client'
import Card from "@/components/Card";
import NavBarComponent from "@/components/NavBarComponent";
import PostFormCard from "@/components/PostFormCard";
import PostPage from "@/components/PostPage";
import { getUserData } from "./helpers/authhelper";
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useContext } from "react";
import { userContext } from "@/context/UserContextProvider";
import { postContext } from "@/context/PostContextProvider";
import { getAllPosts } from "@/server/posts";

export default function Home() {

const {state:postState,postDispatch}=useContext(postContext)


const {state:userState,userDispatch}=useContext(userContext)

  const router=useRouter()


const verify=async()=>{
  const user=await getUserData()

  // userDispatch({ type: "SET_USERID", payload:user?.id});
  // userDispatch({type:"SET_USER_INIT",payload:user?.user_metadata})
  
    
  // console.log(user)
  if(!user){
     router.push("/auth/signIn") 
  }

}

const getPosts = async () => {

        const data = await getAllPosts();
        if (data) {
         await  postDispatch({type:"SET_POSTS",payload:data});
        //  console.log("all posts---------------------",postState?.posts)
        }
      
};

useEffect(()=>{
  verify()
  getPosts();

},[]) 

  
  return (
    <>
      <div className="w-full h-full md:min-w-6xl sm:flex  p-2">
      <div className="flex w-full h-full border-2 ">
          <div className=" xs:hidden md:block md:w-1/4  ">
            <div className="w-1/4 fixed left-0 top-0">
              <NavBarComponent></NavBarComponent>
            </div>
          </div>

          <div className="grow ">
            <div>
              <Card>
                <PostFormCard />
              </Card>
            </div>

            <div>
              <Card>
                <PostPage posts ={postState?.posts}></PostPage>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
