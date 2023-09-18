"use client";
import Post from "./Post";
import { useEffect } from "react";
import { useContext } from "react";
import { postContext } from "@/context/PostContextProvider";

//comments

import { getAllComment } from "@/server/posts";

export default function PostPage(props) {


  const {state,posts, postDispatch, allComments } = useContext(postContext);

  const postorender =  props?.posts ?props?.posts : posts;

  
 

  const fetchComments = async () => {
    const data = await getAllComment();
    if (data) {
      // console.log("data fro comment---------------",data)
      postDispatch({ type: "SETCOMMENTS", payload: data });
    
    }
  };

  // console.log("comments data",state?.allComments);

  useEffect(() => {
    fetchComments();
   
  }, []);

  return (
    <>

<div className="w-full h-full p-2 ">

  {postorender?.map((item)=>{

    // console.log("item-------------",item)
   
    return <>

<Post
      avatar={item?.user?.avatar}
      alldata={item}
      key={item?.id}
      id={item?.id}
      user_name={item?.user?.name}
      content={item?.content}
      photo={item?.photos && item?.photos[0]?.data}
      comments={state?.allComments}
      ></Post>
    
    </>
  } )
  
  
  
  }
</div>

    
    </>
  );
}
