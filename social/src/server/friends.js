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


export const addFriend=async(userId,friendId)=>{
    try {

        const {data,error}=await supabase.from("friends").insert({"owner":userId,"friends":friendId}).select("*")
        if(data){
            return data
        }
        console.log(error)
    } catch (error) {
        console.log(error)
    }
}


export const getRelatedFriends=async(userId)=>{
    try {
        
        const {data,error}=await supabase.from("friends").select("*").eq("owner",userId)
        if(data){
            return data
        }
        console.log(error)
    } catch (error) {
        console.log(error)
    }
}


export const removeFriend=async(userId,friendId)=>{
    try {

        const { data, error } = await supabase
        .from("friends")
        .delete()
        .eq("owner", userId)
        .eq("friends", friendId)
        .select("*");
      
        if(data){
            return data
        }
        console.log(error)
        
    } catch (error) {
        console.log(error)
    }
}

export const getMutualFriends=async(userId,friendId)=>{
    try {

        const {data:userData,error:userError}=await supabase.from("friends").select("*").eq("owner",userId)
        const {data:friendData,error}=await supabase.from("friends").select("*").eq("owner",friendId)

        
if (userData && friendData) {
    
    const newData = userData.filter((item) => {
    //   console.log("item",item)
      const shouldInclude = friendData.some((fitem) => {
        // console.log("f----item",fitem)
        // if(item?.owner===userId && fitem?.owner===friendId){

        // }
        return item?.owner===userId === fitem?.owner===friendId
      });
      return shouldInclude;
    });
  
    console.log("new data", newData);
    

            return newData
        }
        console.log(error)
        
    } catch (error) {
        console.log(error)
    }
}
