'use client'
import Card from "@/components/Card";
import NavBarComponent from "@/components/NavBarComponent";
import PostFormCard from "@/components/PostFormCard";
import PostPage from "@/components/PostPage";
import { getUserData } from "./helpers/authhelper";
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function Home() {



  const router=useRouter()
const verify=async()=>{
  const user=await getUserData()
  // console.log(user)
  if(!user){
     router.push("/auth/signIn") 
  }

}
useEffect(()=>{
  verify()

},[])

  
  return (
    <>
      <div className="w-full h-full md:min-w-6xl sm:flex  p-2">
      <div className="flex w-full h-full border-2 ">
          <div className=" xs:hidden md:block md:w-1/4  ">
            <div className="w-1/4 fixed left-0 top-0">
              <NavBarComponent></NavBarComponent>
            </div>
          </div>

          <div className="grow ">
            <div>
              <Card>
                <PostFormCard />
              </Card>
            </div>

            <div>
              <Card>
                <PostPage></PostPage>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
