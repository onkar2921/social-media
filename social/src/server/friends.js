import { supabase } from "@/lib/supabase/initSupabase"


export const getUsers=async()=>{
    try {
        const {data,error}=await supabase.from("user").select("*")

        if(data){
            return data
        }
        console.log(error)
    } catch (error) {
        console.log(error)
    }
}




export const getFriends=async(userId)=>{
    try {
            alert(userId)

            // const userID = userId.toString();
            const { data, error } = await supabase
            .from("friends")
            .select("*")
            .eq("friend", userId);
        if(data){
            console.log("data of friends",data)
            return data
        }

        
    } catch (error) {
        console.log(error)
    }
}


