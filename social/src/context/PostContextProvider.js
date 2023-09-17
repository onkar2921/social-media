"use client";
import { createContext, useReducer, useState, useEffect } from "react";
import { postReducer } from "@/reducer/post";

import { getUserData } from "@/app/helpers/authhelper";
import { getAllPosts } from "@/server/posts";
import { getUserFromDb } from "@/server/user";

export const postContext = createContext(null);

export default function PostContextProvider({ children }) {
  const initialPosts = {
    posts: [],
    refresh: false,
    likeRefresh: false,
    allComments: [],
    // allUserPosts: [],
  };

  const [state, postDispatch] = useReducer(postReducer, initialPosts);

  const [userId, setUserId] = useState("");

  const getUserID = async () => {
    const user = await getUserData();

    const user_id = await getUserFromDb(user);
    if (user_id && user_id.length > 0) {
      setUserId(user_id[0]?.id);
    }
  };

  const getPosts = async () => {
    if (userId) {
      // console.log("setting post to all user posts");
      const data = await getAllPosts(userId);
      if (data) {
        postDispatch({ type: "SET_POSTS", payload: data });
      }
    }
  };

  useEffect(() => {
    getUserID();
  }, []);

  useEffect(() => {
    if (userId) {
      getPosts();
    }
  }, [userId, initialPosts.refresh]);

  // console.log("post context allposts", state?.posts);

  return (
    <postContext.Provider value={{ ...state, postDispatch }}>
      {children}
    </postContext.Provider>
  );
}
