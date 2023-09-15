'use client'
import { createContext, useReducer,useEffect } from "react";
import { supabase } from "@/lib/supabase/initSupabase";
import { useRouter } from "next/navigation";
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
       address:""
    }
    
    
const [state,userDispatch]=useReducer(userReducer,initalUser)

    


const router = useRouter();


const verify = async () => {
    const getUser = await getUserData();
    if (getUser) {
        // console.log("getuser",getUser)
        userDispatch({type:"SET_USER_INIT",payload:getUser?.user_metadata})
      
        
    } else {
        router.push("/auth/signIn");
    }
};




useEffect(() => {
  verify();


}, []);



const getUserFromDb = async (user) => {
  
  try {
    const { email } = user;
    const exist = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    
    if (exist?.data) {
      // console.log("exist data at user context",exist.data)

      userDispatch({ type: "SET_USERID", payload: exist.data[0] });
    }
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

// console.log("context userId",state.userId)
useEffect(() => {
  getUserFromDb(state);
}, [state?.email]);


    return(
        <>
        <userContext.Provider value={{state,userDispatch}}>
            {children}
        </userContext.Provider>

        </>
    )
}
