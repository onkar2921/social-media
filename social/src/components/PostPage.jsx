"use client";
import Post from "./Post";
import { useEffect } from "react";
import { useContext } from "react";
import { postContext } from "@/context/PostContextProvider";
// import { userContext } from "@/context/UserContextProvider";
// import { getUserPosts } from "@/server/posts";
//comments

import { getAllComment } from "@/server/posts";




export default function PostPage(props) {



  const { posts, postDispatch, allComments } = useContext(postContext);

  const postorender =  props?.posts ?props?.posts : posts;

  
 

  const fetchComments = async () => {
    const data = await getAllComment();
    if (data) {
      postDispatch({ type: "SETCOMMENTS", payload: data });
      // setAllComments(data)
    }
  };

  // console.log("comments data", allComments);

  useEffect(() => {
    fetchComments();
   
  }, [posts,props?.posts]);

  return (
    <>

<div className="w-full h-full p-2 ">

  {postorender?.map((item)=>{
    return <>

<Post
      avatar={item?.avatar}
      alldata={item}
      key={item?.id}
      id={item?.id}
      content={item?.content}
      photo={item?.photos && item?.photos[0]?.data}
      comments={allComments}
      ></Post>
    
    </>
  } )
  
  
  
  }
</div>

    
    </>
  );
}
