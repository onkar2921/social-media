import { supabase } from "@/lib/supabase/initSupabase";

export const handleGoogleLogin=async()=>{
    try {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: "/user/createProfile",
            },
          });

          
    } catch (error) {
        console.log(error)
    }

} 




export const handleGithubLogin=async()=>{
    try {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: "/user/createProfile",
            },
          });

        
    } catch (error) {
        console.log(error)
    }

} 

export const handleEmailSignUp=async(email,password)=>{
    try {

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
        
    } catch (error) {
        console.log(error)
    }

} 





export const handelLogout = async () => {
    try {
      
     
    
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
      } else {
        // console.log("Logout successful");
        // redirect("/auth/signIn")
        return error
      }
    } catch (error) {
        console.log(error)
    }
  };



 export  const handleEmailSignIn = async (email,password) => {
 try {
      
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
 } catch (error) {
    console.log(error)
 }
}




 export  const getUserData = async () => {
   try {
    const {data:{user}} = await supabase.auth.getUser();
    
    if(user){

        return user
    }
    
   } catch (error) {
    console.log(error)
   }
  };