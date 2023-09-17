'use client'
import React from 'react'
import Card from './Card'
import Image from 'next/image'

import { useEffect,useState ,useContext} from 'react';
import { addFriend } from '@/server/friends';
import { getRelatedFriends } from '@/server/friends';
import { removeFriend } from '@/server/friends';
import { getMutualFriends } from '@/server/friends';
import { getAllPosts } from '@/server/posts';
import { userContext } from '@/context/UserContextProvider';
import { postContext } from "@/context/PostContextProvider"
export default function Friends(props) {


  // console.log("friends props",props?.userId,props.friendId)
  const {state}=useContext(userContext)
  
  const handleFriend=async()=>{
      const data=await addFriend(props?.userId,props?.friendId)

      if(data){
        alert("friend added")
        setChange(true)
        getPosts()
      }

  }


  const [change,setChange]=useState(false)

  const getFriendsOfUser=async()=>{
    const data=await getRelatedFriends(props?.userId)

    if(data){
      // console.log("related friends ",data)
      data?.filter((item)=>{
        // console.log("item",item)
        if(item.friends===props?.friendId){
          setChange(true)
        }
    })


    }
  }

  const [mutual,setMutual]=useState([])
  const MutualFriends=async()=>{
    const data=await getMutualFriends(props?.userId,props?.friendId)
    if(data){
      setMutual(data)
    }
  }

  useEffect(()=>{
    getFriendsOfUser()

    MutualFriends()
  },[props?.userId])

const len=mutual?.length


const {postDispatch}=useContext(postContext)



const getPosts = async () => {
  if (state?.userId) {
    // console.log("setting post to all user posts");
    const data = await getAllPosts(state?.userId);
    if (data) {
      postDispatch({ type: "SET_POSTS", payload: data });
    }
  }
};




  const handleFriendRemove=async()=>{
    const data=await removeFriend(props?.userId,props?.friendId)
    if(data){
      getPosts()
      setChange(false)
    }
  }
  return (
    <>
    <Card>
            <div className='w-full h-full flex p-3 border-2 rounded-md'>
                <div className='h-full mr-5'>
                    <Image src={props?.avatar} height={60} width={60} alt=' friends image' className='rounded-full'></Image>
                </div>
                <div>
                    <h2>{props?.name}</h2>
                    <p>{len} mutual friends</p>
                </div>
                {
                  change? <button className='shadow-md  m-5 rounded-md' onClick={handleFriendRemove}>Remove Friend</button> : <button className='shadow-md  m-5 rounded-md' onClick={handleFriend}>Add Friend</button>
                }
            </div>
        </Card>
    </>
  )
}
