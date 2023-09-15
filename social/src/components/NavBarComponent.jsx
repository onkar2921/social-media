'use client'
import Image from "next/image";

import home from "../data/icons/home.png";
import bell from "../data/icons/bell.png"
import bookmark from "../data/icons/bookmark.png"
import friends from "../data/icons/friends.png"
import logout from "../data/icons/logout.png"
import Link from "next/link";
import {handelLogout} from "../app/helpers/authhelper"
import { useRouter } from "next/navigation";

export default function NavBarComponent() {

  const router=useRouter()
 const afterLogout=async()=>{
const error=await handelLogout()
if(!error){
  router.push("/auth/signIn")

}
 }
  return (
    <>
    <div className="w-[80%] h-full flex relative">
      <div className=" w-[22%] h-full md:flex hidden bg-white border-md mb-2 p-2 shadow-md m-2 flex-col items-center sm:block fixed ">
        <h3 className="text-2xl w-full m-2 items-center hover:text-slate-200 hover:cursor-pointer ">Navigation</h3>
        <div className="flex w-full  items-center  p-2 hover:cursor-pointer ">
         <Link href={'/'} className="flex items-center">
         <Image src={home} height={20} width={20} alt="home"></Image>
          <p className="flex items-center ml-3">Home</p>
         </Link>
        </div>
        <div className="flex w-full  items-center p-2 hover:cursor-pointer ">
         <Link href={'/profile/friends'} className="flex items-center">
         <Image src={friends} height={20} width={20} alt="friends"></Image>
          <p className="flex items-center ml-3 m-2">Friends</p>
         </Link>
        </div>
        <div className="flex w-full  items-center p-2 hover:cursor-pointer ">
         <Link href={'/savePosts'} className="flex items-center">
         <Image src={bookmark} height={20} width={20} alt="bookmark"></Image>
          <p className="flex items-center ml-3 m-2">Bookmark</p>
         </Link>
        </div>
        <div className="flex w-full  items-center p-2 hover:cursor-pointer">
         <Link href={'/notifications'} className="flex items-center">
         <Image src={bell} height={20} width={20} alt="notification"></Image>
          <p className="flex items-center ml-3 ">Notification</p>
         </Link>
        </div>
        <div className="flex w-full  items-center p-2 hover:cursor-pointer">
          <Image src={logout} height={20} width={20} alt="logout"></Image>
          <button className="flex items-center ml-3 m-2" onClick={()=>{afterLogout()}}>Logout</button>
        </div>

      </div>
      </div>
    </>
  );
}
