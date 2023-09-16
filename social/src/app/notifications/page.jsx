'use client'
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Card from "@/components/Card";
import Image from "next/image";
import { useEffect } from "react";

import { getAllNotifications } from "@/server/notification";
import { getImagesfromStorage } from "@/server/posts";

export default function page() {


  const [notifications,setNotifications]=useState([])


  const [imageUrl, setImageUrl] = useState("");





useEffect(()=>{

const getNotifications=async()=>{
  const data= await getAllNotifications()

  if(data){
    console.log("all notification data",data)
    setNotifications(data)
  }
}


getNotifications()

},[])




  return (
    <Layout>
      <div className="w-full h-full flex flex-col ">
        <h2 className="w-full text-center p-2 text-4xl shadow-md mt-10">
         Notifications
        </h2>
       {
        notifications && (
          notifications?.map((item)=>{
            console.log("item notificaton",item)
            return <>
                   <Card>
          <div className="w-full h-full p-4 flex items-center ">
           <div className="h-full mr-6 p-2">
            {/* <Image src={item?.avatar} height={70} width={70} className="rounded-full shadow-md "></Image> */}
           </div>
           <p>
              <Link href={"/profile"}>
                <span className="font-bold">{item?.user_name}</span> {item?.notify}
              </Link>

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
