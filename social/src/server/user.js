import { supabase } from "@/lib/supabase/initSupabase";

export const setUserToDatabase = async (user) => {
  try {
    const { name, email, avatar_url } = user;

    const exist = await supabase
      ?.from("user")
      .select("*")
      .eq("email", email);
    // console.log("exist--------", exist, "len of data", exist?.data?.length);

    if (exist?.data?.length < 1) {
      const { data, error } = await supabase.from("user").insert({
        name,
        email,
        avatar: avatar_url,
      });

      if (data) {
        alert("user insetred after signIn");
        // console.log("data ", data);
      }
      alert(error);
    }
  } catch (error) {
    console.log(error);
  }
};


export const getUserFromDb = async (user) => {
  // console.log("user at back", user);
  try {
    const { email } = user;
    // console.log("user at back email", email);
    const exist = await supabase.from("user").select("*").eq("email", email);
    if (exist?.data) {
      // console.log("exist user", exist.data);
    
      return exist.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// const getAllstorage=async()=>{
//     // get all storage

//     const { data, error } = await supabase.storage.from('background').list();
//     return data

// }

export const addProfileBg = async (userId, photo) => {
  try {




    const image = photo;
    // console.log(image);
    const imagePath = `public/${image?.name}`;
    const Imagedata = await supabase.storage
      .from("background")
      .upload(imagePath, image);

    const { data, error } = await supabase
      .from("user")
      .update({ cover: image?.name })
      .eq("id", userId)
      .select();

   
  
    if (data) {
      alert("Background updated");
    } else {
      console.error("Error updating profile:", error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getbackgroundfromStorage = async (userId) => {
  try {

    // console.log("server usier id",userId)
    const getBG = await supabase
      .from("user")
      .select("cover")
      .eq("id", userId);

    // console.log("getBG=----", getBG.data[0]?.cover);

    const ImageName = getBG.data[0]?.cover;

    return ImageName;
  } catch (error) {
    console.log(error);
  }
};


export const updateUser=async(userId,name,address)=>{
  try {

    const {data,error}=await supabase.from("user").update({"name":name,"address":address}).eq("id",userId).select()

    if(data){
    // console.log("updated user data",data)
      return data
    }
    
  } catch (error) {
    console.log(error)
  }
}




export const getUserInfo=async(userId)=>{
  try {
    // alert("hit getuser")
    const {data,error}=await supabase.from("user").select("*").eq("id",userId)

    if(data){
      return data;
    }
    console.log(error)
    
  } catch (error) {
    console.log(error)
  }
}