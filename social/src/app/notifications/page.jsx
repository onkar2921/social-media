'use client'
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Card from "@/components/Card";

import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "@/context/UserContextProvider";
import { getAllNotifications } from "@/server/notification";
import { delteNotification } from "@/server/notification";

export default function page() {


  const {state}=useContext(userContext)
  const [notifications,setNotifications]=useState([])

  useEffect(()=>{




  },[state?.userId])






useEffect(()=>{

const getNotifications=async()=>{
  const data= await getAllNotifications()

  if(data){
    // console.log("all notification data",data)
    const newNotificationData=data?.filter((item)=>item?.userId!==state?.userId)
    setNotifications(newNotificationData)
  }
}


getNotifications()

},[])




const handleDeleteNotification=async(notificationId)=>{

  const data=await delteNotification(notificationId)
  getNotifications()

}







  return (
    <Layout >
      <div className="w-full h-full flex flex-col ">
        <h2 className="w-full text-center p-2 text-4xl shadow-md mt-10">
         Notifications
        </h2>
        
       {
        notifications && (
          notifications?.map((item)=>{
            // console.log("item notificaton",item)
            
            return <>
                   <Card>
          <div className="w-full h-full p-4 flex items-center ">
           <div className="h-full mr-6 p-2">
            {/* <Image src={item?.avatar} height={70} width={70} className="rounded-full shadow-md "></Image> */}
         
           </div>
           <p className="flex items-center justify-around">
              <Link href={`/profile/${item?.userId}`} >
                <span className="font-bold ">{item?.user_name}</span> {item?.notify}

              </Link>
                <button className="ml-4 bg-black rounded-md text-red-500 p-1" onClick={()=>handleDeleteNotification(item?.id)}>Delete</button>

              {/* <span className="font-bold  text-blue-500"> post</span> */}
            </p>
          </div>
        </Card>
            
            
            </>
          })
        )
       }





</div>
    </Layout>
  );
}
