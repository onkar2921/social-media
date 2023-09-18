"use client";
import { createContext, useReducer } from "react";
import { postReducer } from "@/reducer/post";


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

 

 
  return (
    <postContext.Provider value={{state, postDispatch }}>
      {children}
    </postContext.Provider>
  );
}
