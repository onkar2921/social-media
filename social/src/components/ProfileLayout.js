"use client";
import Layout from "./Layout";
import Card from "@/components/Card";
import Image from "next/image";

import posts from "../data/icons/posts.png";
import photos from "../data/icons/photos.png";
import about from "../data/icons/about.png";
import friends from "../data/icons/friends.png";

import Link from "next/link";

import { getUserData } from "../app/helpers/authhelper";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { useContext } from "react";
import { userContext } from "../context/UserContextProvider";

import { addProfileBg } from "@/server/user";
import { getbackgroundfromStorage } from "@/server/user";



//update user
import { updateUser } from "@/server/user";

export default function ProfileLayout({children,...props}) {
  const { state, userDispatch } = useContext(userContext);

  console.log("profile layout props",props)

 

  const router = useRouter();

  const verify = async () => {
    const getUser = await getUserData();

    if (!getUser) {
      router.push("/auth/signIn");
    }
  };

  useEffect(() => {
    verify();
  }, [state?.email]);


  const [showbtn, setShowbtn] = useState(false);
  const [photo, setPhoto] = useState("");

  const sendBGtoStorage = async () => {
    const data = await addProfileBg(state?.userId, photo);
    setShowbtn(false);
  };

  const [background, setBackground] = useState("");

 

  const getBackground = async () => {
    if (state?.userId) {
      const data = await getbackgroundfromStorage(state.userId);

      setBackground(data);
      // console.log("back to display", data);
    }
  };

  useEffect(() => {
    getBackground();
  }, [state?.userId, background, photo]);

  const BGURL = background
    ? `https://adefwkbyuwntzginghtp.supabase.co/storage/v1/object/public/background/public/${background}`
    : "";

  const url = state?.avatar || "";



const [updateOption,setUpdateOption]=useState(false)
const [name,setName]=useState("")
const [address,setAddress]=useState("")

 const updateProfile=async()=>{
  setUpdateOption(true)

 }


const SubmitUpdate=async()=>{

const data=await updateUser(state?.userId,name,address)



console.log("front updated user data",data[0])

// UPDATE_USER
userDispatch({type:"UPDATE_USER",payload:data[0]})

  setUpdateOption(false)
}

  return (
    <>
      <div className="w-full h-full md:min-w-6xl sm:flex  p-2">
        <Layout>
          
          <div className="w-full h-full flex items-center  flex-col rounded-md">
            <Card>
              <div className="xs:w-full h-full flex  flex-col p-2 relative">
                <div className="flex h-full w-full ">
                  <div className="h-full w-full flex items-center justify-around relative">
                    <Image
                      // bg url
                      src={BGURL}
                      alt="user profile-bg"
                      height={100}
                      width={200}
                      className=" md:w-[80%] xs:w-[100%] xs:h-[300px] h-auto xs:p-1 md:p-6 mb-3 rounded-md"
                    ></Image>

                    {!showbtn ? (
                      <label className="rounded-md flex items-center shadow-md bg-white border-md mb-4 h-10 w-40 absolute bottom-6 md:bottom-10 xs:right-4 sm:right-40 cursor-pointer">
                        Change background
                        <input
                          type="file"
                          onChange={(e) => {
                            const photo = e.target.files[0];
                            console.log("photo", photo);
                            if (photo) {
                              setPhoto(photo);
                              setShowbtn(true);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <button
                        onClick={sendBGtoStorage}
                        className="rounded-md flex items-center justify-center shadow-md bg-white border-md mb-4 h-10 w-40 absolute bottom-6 md:bottom-10 xs:right-4 sm:right-40 "
                      >
                        update
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex w-full h-full  items-center p-2">
                  <div className="w-[20%] h-full">
                    <Image
                      src={url}
                      alt="user profile"
                      height={80}
                      width={80}
                      className=" mr-5  absolute top-[55%] left-[17%] shadow-2x rounded-full"
                    ></Image>
                  </div>

                  <div className="flex  w-[60%]  items-center justify-between xs:ml-20 md:ml-10">
                    <div>
                      <h1>{state?.name}</h1>
                      <p>{state?.address}</p>
                    </div>
                    <div>
                      {/* update option for name and address */}

                      {
                        updateOption ? (
                         <div className="w-[50%] flex items-center p-2">
                           <div className=" shadow-md p-2 flex items-center justify-center flex-col">
                            <input type="text" placeholder="name"  className="m-1" value={name} onChange={(e)=>{setName(e.target.value)}} />
                            <input type="text" placeholder="address" className="m-1" value={address} onChange={(e)=>{setAddress(e.target.value)}}  />
                            <button onClick={SubmitUpdate} className="m-1">submit</button>
                          </div>
                         
                         </div>
                        )
                      :
                      <button onClick={updateProfile} className="flex items-center shadow-md p-1">
                      update Profile
                    </button>
                      
                      }

                   
                    </div>
                  </div>
                </div>
                <div className="flex h-full w-full p-2 items-center justify-evenly">
                  <div className="flex items-center">
                    <Link href={"/profile"}>
                      <Image
                        src={posts}
                        height={20}
                        width={30}
                        alt="posts"
                      ></Image>
                      <p>Posts</p>
                    </Link>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <Link href={"/profile/about"}>
                      <Image
                        src={about}
                        height={20}
                        width={30}
                        alt="posts"
                      ></Image>
                      <p>About</p>
                    </Link>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <Link href={"/profile/friends"}>
                      <Image
                        src={friends}
                        height={20}
                        width={30}
                        alt="posts"
                      ></Image>
                      <p>Friends</p>
                    </Link>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <Link href={"/profile/photos"}>
                      <Image
                        src={photos}
                        height={20}
                        width={30}
                        alt="posts"
                      ></Image>
                      <p>Photos</p>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
                  
                  
                
             

          {children}
          </div>
        </Layout>
      </div>
    </>
  );
}
