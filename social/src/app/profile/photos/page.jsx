"use client"
import Card from "@/components/Card"
import Photos from "@/components/Photos"
import ProfileLayout from "@/components/ProfileLayout"
import { getUserPosts } from "@/server/posts"
import { userContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState } from "react";

export default function page() {

  const { state } = useContext(userContext);
  // console.log("userid", state);

   
  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(() => {
    const getUserAllPosts = async () => {
      if (state?.userId) {
        const data = await getUserPosts(state?.userId);
  
        if (data) {
          console.log("user related posts", data);
          const photoPaths = data?.map((item) => {
            return item?.photos[0]?.data?.path;
          });
          setUserPhotos(photoPaths);
        }
      }
    };
  
    getUserAllPosts();
  }, [state?.userId]);
  
  console.log("userPhotos", userPhotos);
  

  
 


  return (
    <>
    
   
             <ProfileLayout>
             <div className="w-full h-full flex rounded-md shadow-md p-2 flex-col">
                <h2 className="text-center text-4xl m-2">Photos</h2>
              
                <Card>
                  {
                    userPhotos?.map((item,ind)=>{
                      return<>
                      <Photos key={ind} photo={item}></Photos>
                      </>
                    })
                  }
                </Card>
              </div>
             </ProfileLayout>
        
    </>
  )
}
