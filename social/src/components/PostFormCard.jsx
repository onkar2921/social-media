import Image from "next/image";
// import user from "../data/icons/user.png";
// import profile from "../data/icons/profile.png";
// import smile from "../data/icons/smile.png";
// import checkin from "../data/icons/checkin.png";
import Photos from "../data/icons/photos.png";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { getUserData } from "@/app/helpers/authhelper";
import { getUserFromDb } from "@/server/user";
import { createPost } from "@/server/posts";
import { postContext } from "@/context/PostContextProvider";
import { getAllPosts } from "@/server/posts";
import { getLastPostOfUser } from "@/server/posts";
import { userContext } from "@/context/UserContextProvider";

// import { addNotification } from "@/server/notification";
export default function PostFormCard() {
  const { postDispatch } = useContext(postContext);
  const {state}=useContext(userContext)
  const getWholePosts = async () => {
    try {
      const data = await getAllPosts(state?.userId);
      if (data) {
        postDispatch({ type: "SET_POSTS", payload: data });
      }
    } catch (error) {
      console.error("Error fetching all users posts:", error);
    }
  };

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
 
  const verify = async () => {
    const user = await getUserData();

    setUser(user?.user_metadata);

    const user_id = await getUserFromDb(user);
    setUserId(user_id[0]?.id);

    if (!user) {
      router.push("/auth/signIn");
    }
  };

  useEffect(() => {
    verify();
  }, []);



  const handlePhoto = async (e) => {
    setPhotos(e.target.files);
  };



  
  const handlePost = async () => {
    try {
      // if(photos.length>0 || content.length>0){

      // }
      const data=  await createPost(userId, content, photos)

      setContent("");
    // console.log("psot created data",data)
      //again set posts to context
      await getWholePosts();

      const lastPostData=await getLastPostOfUser(userId)
      if(lastPostData){
        // alert("last post got")

        // const data=await addNotification(userId,lastPostData?.id,"new Post Added")

        // console.log("last data",lastPostData)

      }
     
      // alert("hit again")
    } catch (error) {
      console.log(error);
    }
  };

  const url = user?.avatar_url;

  return (
    <>
      {/* <button onClick={getData}>get id</button> */}
      <div className="w-full h-full p-2 md:flex sm:p-6 flex-col items-start    ">
        
        <div className="md:w-[80%] h-full flex p-2 mb-2">
          <Image
            src={url}
            height={60}
            width={80}
            alt="profile image"
            className="rounded-full shadow-sm mr-2"
          ></Image>
          {/* <textarea name="" id="" cols="2" rows="10" className="bg-red-300 w-[60%]"></textarea> */}
          <input
            type="text-area"
            placeholder={`Whats on your mind, ${user?.name}?`}
            className="focus:outline-none "
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>

        <div className="w-full h-full flex items-center md:justify-center sm:justify-between mt-2 ">
          <div className="flex items-center   w-full">
            <div className="flex items-center ">
              <label className="flex items-center">
                <Image
                  src={Photos}
                  height={20}
                  width={20}
                  alt="photos image"
                  className="rounded-full shadow-sm xs:mr-2 md:m-2 "
                ></Image>
                <input
                  type="file"
                  onChange={handlePhoto}
                  multiple
                  required
                  className="hidden"
                />
                <p className="mr-1">Photos</p>
              </label>
            </div>
            {/* <div className="flex items-center ">
              <Image
                src={profile}
                height={20}
                width={20}
                alt="profile image"
                className="rounded-full shadow-sm xs:mr-2 md:m-2 "
              ></Image>
              <p className="mr-1">People</p>
            </div>
            <div className="flex items-center ">
              <Image
                src={checkin}
                height={20}
                width={20}
                alt="check in"
                className="rounded-full shadow-sm xs:mr-1 md:m-2 "
              ></Image>
              <p className="xs:mr-2 md:mr-1">Check-In</p>
            </div>
            <div className="flex items-center">
              <Image
                src={smile}
                height={20}
                width={20}
                alt="smile"
                className="rounded-full shadow-sm xs:mr-1 md:m-2 "
              ></Image>
              <p className=" xs:mr-2 md:mr-10">Mood</p>
            </div> */}
            <button
              className="bg-blue-500 shadow-xl rounded-md px-3 ml-6 text-white"
              onClick={handlePost}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
