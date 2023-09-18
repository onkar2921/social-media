"use client";
import Card from "@/components/Card";
import PostPage from "@/components/PostPage";
import ProfileLayout from "@/components/ProfileLayout";
import { useEffect, useState } from "react";
import { getUserPosts } from "@/server/posts";

export default function page({ params }) {
  const { profileId } = params;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUSerPostsData = async () => {
      if (profileId) {
        const data = await getUserPosts(profileId);

        if (data) {
          setUserPosts(data);
        }
      }
    };

    getUSerPostsData();
  }, []);

  

  return (
    <>
      <ProfileLayout profileId={profileId}>
        <div className="w-full h-full">
          <Card>
            <PostPage posts={userPosts}></PostPage>
          </Card>
        </div>
      </ProfileLayout>
    </>
  );
}
