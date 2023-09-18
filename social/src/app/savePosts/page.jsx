"use client";
import React, { useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout";
import { getBookmark, removeBookmark } from "@/server/posts";
import { userContext } from "@/context/UserContextProvider";
import Post from "@/components/Post";


export default function Page() {

  const { state } = useContext(userContext);
 
  const [allBookmarks, setAllBookmarks] = useState([]);

  const getAllBookmarks = async () => {
    if (state?.userId) {
      const data = await getBookmark(state?.userId);
      if (data) {
        // console.log("all bookmarks", data);
        setAllBookmarks(data);
      }
    }
  };
  
  useEffect(() => {
    

    getAllBookmarks();
  }, [state?.userId]);

  const handleRemoveBookmark = async (bookmarkId) => {
    const data = await removeBookmark(bookmarkId);

    if (data) {
      alert("bookmark removed");
      getAllBookmarks();
    }

    console.log(data.error);
  };

  return (


    <Layout>
      <div className="w-full h-full flex flex-col">
        <h2 className="w-full text-center p-2 text-4xl shadow-md mt-10">
          Your Saved Posts
        </h2>

        <div className="h-full w-full mt-2 flex items-center justify-center flex-col">
          {allBookmarks?.map((item) => {
              // console.log("iytem--------------",item)
            return (
              <>
                <Post

                  onRemoveBookmark={() => handleRemoveBookmark(item.id)}
                  avatar={item?.avatar}
                  key={item?.id}
                  id={item?.id}
                  content={item?.posts?.content}
                  alldata={item}
                  user_name={
                    // item?.user?.name
                  item?.user_name
                  }
                  photo={item?.posts?.photos && item?.posts?.photos[0]?.data}

                ></Post>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
