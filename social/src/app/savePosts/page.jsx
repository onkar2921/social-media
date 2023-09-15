'use client'
import React, { useEffect, useState, useContext } from 'react'
import Layout from '@/components/Layout'
import { getBookmark, removeBookmark } from '@/server/posts'
import { userContext } from '@/context/UserContextProvider'
import Post from '@/components/Post'

import { useRouter } from 'next/navigation'

export default function Page() {


  const router=useRouter()
  const currentPath = router.pathname;
  console.log("path",currentPath)



  
  const { state } = useContext(userContext);
  const [userID, setUserID] = useState("");

  const [allBookmarks,setAllBookmarks]=useState([])
  useEffect(() => {
    if (state?.userId) {
      setUserID(state.userId);
    }
  }, [state?.userId]);
  
  const [refresh,setRefresh]=useState(false)
 
 
 
  useEffect(() => {
    const getAllBookmarks = async () => {
      if (userID) {
        const data = await getBookmark(userID);
        if (data) {
          console.log("all bookmarks", data);
          setAllBookmarks(data)
        }
      }
    }

    getAllBookmarks();
  }, [userID,refresh]);



  const handleRemoveBookmark=async(postId)=>{

    const data=await removeBookmark(postId)

    if(data){
      alert("bookmark removed")
      setRefresh(true)
return
    }
    s
    console.log(data.error)

  }

  return (
    <Layout>
      <div className='w-full h-full flex flex-col'>
        <h2 className='w-full text-center p-2 text-4xl shadow-md mt-10'> Your Saved Posts</h2>

   
      <div className='h-full w-full mt-2 flex items-center justify-center flex-col'>
      {
        allBookmarks?.map((item)=>{
          return <>
            <Post   onRemoveBookmark={()=>handleRemoveBookmark(item.id)}
            key={item.id}
            id={item.id}
            content={item.content}
            photo={item.photos[0].data}
            ></Post>
        </>
      })
    }
      </div>
    </div>
    </Layout>
  )
}
