'use client'
import google from "../../../data/icons/google.png"
import github from "../../../data/icons/github.png"
import Image from "next/image"
import { handleGoogleLogin } from "@/app/helpers/authhelper"
import { handleGithubLogin } from "@/app/helpers/authhelper"

export default function page() {



  return (
   <>
    <div className="w-full h-[100vh] p-2 flex  items-center justify-center flex-col  ">
        <h2 className="w-full flex  items-center justify-center p-2 m-3 opacity-30 text-4xl  ">Login</h2>
       
            <div className="w-[50%] xs:h-[30%] md:h-[50%] flex   justify-center rounded-md shadow-md  flex-col">
                <button onClick={()=>{handleGoogleLogin()}}  className="m-2 rounded-md shadow-xl p-2 flex items-center "> <Image src={google} height={40} width={40} alt="google" className="mr-4"></Image>Google</button>
                <button onClick={()=>{handleGithubLogin()}} className="m-2 rounded-md shadow-xl p-2 flex items-center "><Image src={github} height={40} width={40} alt="google" className="mr-4"></Image> Github</button>
            </div>

    
       
    </div>
   
   </>
  )
}
