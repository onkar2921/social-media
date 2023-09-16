"use client";
import Card from "@/components/Card";
import PostPage from "@/components/PostPage";
import ProfileLayout from "@/components/ProfileLayout";



export default function page({params}) {
  const { profileId } = params;

  console.log('Current URL path:', profileId);
 

  return (
    <>
      <ProfileLayout profileId={profileId}>
        <div className="w-full h-full">
          <Card>

            <PostPage ></PostPage>
          </Card>
        </div>
      </ProfileLayout>
    </>
  );
}
