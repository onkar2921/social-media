import { supabase } from "@/lib/supabase/initSupabase";

export const createPost = async (userId, content, photos) => {
  try {
    // console.log("backend photo:-", photos);

    let photoArray = [];
    for (const file of photos) {
      // console.log("file----",file.name)
      const imagePath = `public/${file.name}`;
      const data = await supabase.storage
        .from("photos")
        .upload(imagePath, file);
      photoArray.push(data);
      // console.log("photos data", data);
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({ content: content, author: userId, photos: photoArray })
      .select();

    if (data) {
      alert("post created");
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};


export const getLastPostOfUser=async(userId)=>{
  try {

    const { data ,error } = await supabase
    .from("posts")
    .select("*")
    .eq("author", userId)
    .order("created_at", { ascending: false }) 
    .limit(1); 
  

    const lastInsertedData = data[0]; // Get the first (and only) record
  
    if (lastInsertedData) {
      // console.log("Last inserted data:", lastInsertedData);
      return lastInsertedData
    } else {
      console.log("No data found.");
    }
  
    
  } catch (error) {
    console.log(error)
  }
}

// export const getAllPosts = async () => {
//   try {
//     const { data, error } = await supabase.from("posts").select("*");


// const allData=[]
  
//     data?.map(async(item)=>{
//       const {data:getFriends}=await supabase.from("friends").select("*").eq("friends",item.author)

//       if(getFriends){
//         allData.push(item)
//       }

//     })




//     if (allData) {
//       // console.log("data for bk all users posts",data)
//       return allData;
//     }
//     console.log(error);
//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllPosts = async (userId) => {
  try {

//     const { data: getFriends } = await supabase
//     .from("friends")
//     .select("*")
//     .eq("owner", userId);
  
//   const allData = [];
  
//   for (const item of getFriends) {
//     console.log("items------------", item);
  
//     const { data, error } = await supabase
//       .from("posts")
//       .select("*")
//       .eq("author", item.friends)
//       .order("created_at", { ascending: false });
      
//       const {data:userData}=await supabase.from("users").select("avatar").eq("id",data.author)
// console.log("userData------",userData)
  
//     if (data) {
//       let userPhoto=userData
//       allData.push(...data,userPhoto); 
//     }
//   }
  
//   if (allData) {
//     console.log("all data", allData);
//     return allData;
//   }
  

const { data: getFriends } = await supabase
  .from("friends")
  .select("*")
  .eq("owner", userId);

const allData = [];

for (const item of getFriends) {
  // console.log("items------------", item);

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("author", item.friends)
    .order("created_at", { ascending: false });

  if (postData) {
    for (const post of postData) {

      // console.log("posttt--------------",post)
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("avatar")
        .eq("id", post.author);

      if (userData) {
        const userWithAvatar = { ...post, avatar: userData[0]?.avatar };
        allData.push(userWithAvatar);
      }
    }
  }
}

if (allData) {
  // console.log("all data", allData);
  return allData;
}

    console.log(error);
    return null; 
  } catch (error) {
    console.log(error);
  }
};


export const getImagesfromStorage = async (imageName) => {
  try {
    const objectName = "photos/" + imageName;
    const { data, error } = await supabase.storage
      .from("photos")
      .getPublicUrl(objectName);

    if (data) {
      // console.log("image data from storage",data)
      return data;
    }

    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    // alert("getting")
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("author", userId);

const allData=[]
      if (data) {
        for (const post of data) {
    
          // console.log("posttt--------------",post)
          const { data: userData, error: userError } = await supabase
            .from("user")
            .select("avatar")
            .eq("id", post.author);
    
          if (userData) {
            const userWithAvatar = { ...post, avatar: userData[0]?.avatar };
            allData.push(userWithAvatar);
          }
        }
      }

    if (allData) {
      return allData;
    }

    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export const addBookmark = async (userId, postId) => {
  try {
    const { data, error } = await supabase
      .from("Bookmark")
      .insert({ user: userId, post: postId })
      .select("*");
    if (data) {
      return data;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};



export const getBookmark = async (userId) => {
  // console.log("user id for bookmark", userId);
  try {
    const { data: bookmarkData, error: bookmarkError } = await supabase
      .from("Bookmark")
      .select("*")
      .eq("user", userId);

    if (bookmarkError) {
      console.error("Error fetching bookmarks:", bookmarkError);
      return null;
    }

    if (bookmarkData) {
      const postIds = bookmarkData.map((bookmark) => bookmark?.post);
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .in("id", postIds);

      if (postsError) {
        console.error("Error fetching posts:", postsError);
        return null;
      }

      if (postsData) {
        return postsData;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const removeBookmark = async (postId) => {
  try {
    const data = await supabase.from("Bookmark").delete().eq("post", postId);

    if (data) {
      alert("removed");
      // console.log("data after removed", data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePostFromTbale = async (postId, userId) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId, "author", userId)
      .eq("author",userId);

    alert("post deletd");
    return data;
    
  } catch (error) {
    console.log(error);
  }
};

export const postLike = async (userId, postId) => {
  try {
    const existData = await supabase
      .from("likes")
      .select("*")
      .eq("user", userId)
      .eq("post", postId);

    // console.log("existData", existData.data.length);

    if (existData.data.length < 1) {
      const { data, error } = await supabase
        .from("likes")
        .insert({ user: userId, post: postId })
        .select("*");

      if (data) {
        return data;
      } else {
        // console.log("alredy liked");
        return 1;
      }
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLikeCount = async (postId) => {
  try {
    const { data, error } = await supabase
      .from("likes")
      .select("post", { count: "exact", groupby: "post" })
      .eq("post", postId);

    let len = data.length;
    if (len < 1) {
      len = 0;
    }

    if (data) {
      return data, len;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (userId, postId) => {
  try {
    const { data, error } = await supabase
      .from("likes")
      .delete()
      .eq("user", userId)
      .eq("post", postId)
      .select("*");
    // console.log("dislike post data", data);
    if (data) {
      return data;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

//comments

export const addComment = async (userId, postId, text) => {
  try {
    const { data: userData } = await supabase
      .from("user")
      .select("name")
      .eq("id", userId);

    // console.log(userData[0].name)
    const { data, error } = await supabase
      .from("comments")
      .insert({
        user: userId,
        post: postId,
        comment: text,
        user_name: userData[0]?.name,
      });

    if (data) {
      return data;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (data) {
      return data;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export const getAllComment = async () => {
  try {
    const { data, error } = await supabase.from("comments").select("*");

    if (data) {
      return data;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};


