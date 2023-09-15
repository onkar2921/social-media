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

export const getAllPosts = async () => {
  try {
    const { data, error } = await supabase.from("posts").select("*");
    if (data) {
      // console.log("data for bk all users posts",data)
      return data;
    }
    console.log(error);
    return;
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

    if (data) {
      return data;
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

// export const getBookmark=async(userId)=>{
//   try {

//     const {data,error}=await supabase.from("Bookmark").select("*").eq("user",userId)

//     if(data){
//    const postIds = data?.map((bookmark) => bookmark.post);
//   const { data: postsData, error: postsError } = await supabase
//   .from("posts")
//   .select("*")
//   .in("id", postIds);

//  }

//  if(postsData){
//   return postsData
//  }

//     console.log(error)

//   } catch (error) {
//     console.log(error)
//   }
// }

export const getBookmark = async (userId) => {
  console.log("user id for bookmark", userId);
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
      const postIds = bookmarkData.map((bookmark) => bookmark.post);
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
      console.log("data after removed", data);
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
      .eq("id", postId)
      .eq("author",userId);

    alert("post deletd");
    return data;
    console.log(error);
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

    console.log("existData", existData.data.length);

    if (existData.data.length < 1) {
      const { data, error } = await supabase
        .from("likes")
        .insert({ user: userId, post: postId })
        .select("*");

      if (data) {
        return data;
      } else {
        console.log("alredy liked");
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
    console.log("dislike post data", data);
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
        user_name: userData[0].name,
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

    // const { data: comments, error: commentsError } = await supabase
    // .from('comments')
    // .select('*');

    // // Next, fetch user names for the comments
    // if (!commentsError && comments) {
    // for (const comment of comments) {
    //   const { data: userData, error: userError } = await supabase
    //     .from('user')
    //     .select('name')
    //     .eq('id', comment.user)
    //     .single();

    //   if (!userError && userData) {
    //     comment.user = userData.name;
    //   }
    // }
    // }

    // console.log(comments);

    // const { data, error } = await supabase
    //   .from('comments')
    //   .select(
    //     '*, { user: (from(user).select(name).eq(id, user).single()) }'
    //   );

    console.log(data);

    console.log(data);

    if (data) {
      return data;
    }
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};
