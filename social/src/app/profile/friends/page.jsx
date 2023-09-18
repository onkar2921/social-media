'use client'
import Card from "@/components/Card"
import Friends from "@/components/Friends"
import ProfileLayout from "@/components/ProfileLayout"
import { useContext, useEffect, useState } from "react"
import { userContext } from "@/context/UserContextProvider"
import { getFriends } from "@/server/friends"
import { getUsers } from "@/server/friends"



export default function page() {

const {state}=useContext(userContext)

const [allusers,setAllusers]=useState([])


 



useEffect(()=>{
  const getAllUsers=async()=>{
    const data=await getUsers()

    if(data){
       
        setAllusers(data)
       
    }

    console.log(data.error)
  }

  getAllUsers()


  
},[])



  return (
    <>
 
             <ProfileLayout>
             <div className="w-full h-full flex flex-col rounded-md p-2 border-2">
                <h2 className="text-center text-4xl m-2">Friends</h2>
                <Card>
                {allusers && 
                  allusers?.map((item)=>{
                    return <>
                           <Friends friendId={item?.id} userId={state?.userId} avatar={item?.avatar} name={item?.name}></Friends>
                    </>
                  })
                }
                 
                </Card>
              </div>
             </ProfileLayout>
        
    </>
  )
}
