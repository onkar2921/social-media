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
  .select("*");


const processedNotifications = [];

for (const notification of notificationData) {
  const userId = notification?.user;

  const { data: allData } = await supabase
    .from("user")
    .select("name, avatar")
    .eq("id", userId);

  const notificationItem = {
    id: notification?.id,
    userId:notification?.user,
    postId:notification?.post,
    user_name: allData[0]?.name,
    notify: notification?.notify,
    avatar: `https://adefwkbyuwntzginghtp.supabase.co/storage/v1/object/public/photos/${allData[0]?.avatar}`  
  };

//   console.log("nottification item post id",notificationItem?.postId)


  const {data:checkpostData}=await supabase.from("posts").select("*").eq("id",notificationItem?.postId)

  if(checkpostData){

      processedNotifications.push(notificationItem);
  }



}




return processedNotifications


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