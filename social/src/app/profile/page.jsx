"use client";
import Card from "@/components/Card";
import PostPage from "@/components/PostPage";
import ProfileLayout from "@/components/ProfileLayout";

import { userContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "@/server/posts";

export default function page() {
  
  // const { state } = useContext(userContext);
  // console.log("userid", state);

  // const [userRelatedPosts, setUserRelatedPosts] = useState([]);

  // useEffect(() => {
  //   const getUserAllPosts = async () => {
  //     if (state?.userId) {
  //       const data = await getUserPosts(state?.userId);

  //       if (data) {
  //         console.log("user related posts", data);
  //         setUserRelatedPosts(data);
  //       }
  //     }
  //   };

  //   getUserAllPosts();
  // }, [state?.userId]);

  return (
    <>
      <ProfileLayout>
        <div className="w-full h-full">
          <Card>
            <PostPage ></PostPage>
          </Card>
        </div>
      </ProfileLayout>
    </>
  );
}
