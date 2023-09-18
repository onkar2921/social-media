'use client'
import { createContext, useReducer,useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/initSupabase";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/app/helpers/authhelper";

import { userReducer } from "@/reducer/user";

export const  userContext=createContext(null)

export default function UserContextProvider({children}){

    const initalUser={
       name:"",
       avatar:"",
       userId:"",
       email:"",
       info:[],
       address:"",
       profileUser:""
    }
    
    
const [state,userDispatch]=useReducer(userReducer,initalUser)

    


const router = useRouter();
// const [userId,setUserId]=useState("")

const verify = async () => {
    const getUser = await getUserData();
    // setUserId(getUser?.id)
    if (getUser ) {
     
      userDispatch({ type: "SET_USERID", payload:getUser?.id});
      userDispatch({type:"SET_USER_INIT",payload:getUser?.user_metadata})
      
        
    } else {
        router.push("/auth/signIn");
    }
};




useEffect(() => {
  verify();
}, []);



    return(
        <>
        <userContext.Provider value={{state,userDispatch}}>
            {children}
        </userContext.Provider>

        </>
    )
}
