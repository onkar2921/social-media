"use client"
import Card from "@/components/Card"
import Photos from "@/components/Photos"
import ProfileLayout from "@/components/ProfileLayout"
import { getUserPosts } from "@/server/posts"
import { userContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState } from "react";

export default function page({params}) {

  const { state } = useContext(userContext);



// const {userId}=params
// alert("hi")



const [userPhotos, setUserPhotos] = useState([]);
const [user,setUser]=useState(state?.userId)
useEffect(() => {
  // console.log("phot page userID------------------------",params?.userId)
  
  if(params?.userId!==state?.userId){
    setUser(params?.userId)
    
  }
  
  
  
  
  // console.log("photo page parms=---------------",params.userId)
  
  const getUserAllPosts = async () => {
      if (params?.userId) {
        const data = await getUserPosts(params?.userId);
  
        if (data) {
          // console.log("user related posts", data);
          const photoPaths = data?.map((item) => {
            return item?.photos[0]?.data?.path;
          });
          setUserPhotos(photoPaths);
        }
      }
    };
  
    getUserAllPosts();
  }, [params]);
  
  // console.log("userPhotos", userPhotos);
  

  
 


  return (
    <>
    
   
             <ProfileLayout profileId={params?.userId}>
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
