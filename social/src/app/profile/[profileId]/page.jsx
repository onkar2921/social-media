"use client";
import Card from "@/components/Card";
import PostPage from "@/components/PostPage";
import ProfileLayout from "@/components/ProfileLayout";
import { useEffect,useState } from "react";
import { userContext } from "@/context/UserContextProvider";
import { useContext } from "react";
import { getUserPosts } from "@/server/posts";

export default function page({params}) {
  const { profileId } = params;

  const {state,userDispatch}=useContext(userContext)

  // console.log('Current URL path:', profileId);





  const [userPosts,setUserPosts]=useState([])
  const [profileUser,setProfileUser]=useState("")

  useEffect(()=>{


    if(state?.profileUser){
      setProfileUser(state?.profileUser)
    }

    const getUSerPostsData=async()=>{
      const data=await getUserPosts(profileUser?.id)

      if(data){
        setUserPosts(data)
      }
    }

    getUSerPostsData()
    // console.log("user posts",userPosts)
  
   

  },[state?.profileUser,profileUser])

  

 

  return (
    <>
      <ProfileLayout profileId={profileId}>
        <div className="w-full h-full">
          <Card>

            <PostPage posts={userPosts} ></PostPage>
          </Card>
        </div>
      </ProfileLayout>
    </>
  );
}
