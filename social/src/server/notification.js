import { supabase } from "@/lib/supabase/initSupabase";

export const addNotification=async(userId,postId,notification)=>{
    try {

        // alert("hit notify back")
        const {data,error}=await supabase.from("notifications").insert({"user":userId,"post":postId,"notify":notification}).select("*")
        if(data){
            return data
        }
        console.log(error)
        
    } catch (error) {
        console.log(error)
    }
}


export const getAllNotifications=async(userId)=>{
    try {
       


        const { data: notificationData, error } = await supabase
  .from("notifications")
  .select(`*,user(*),posts(*)`);


//   console.log("notification info",notificationData)
  if(notificationData){
    return notificationData
  }



    } catch (error) {
        console.log(error)
    }

}

export const delteNotification=async(notifyId)=>{
    try {
        const {data,error}=await supabase.from("notifications").delete().eq("id",notifyId).select("*")
        if(data){
            return data
        }
        console.log(error)
    } catch (error) {
        console.log(error)
    }
}