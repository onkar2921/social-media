import React from "react";
import { useEffect,useState } from "react";
import Card from "./Card";
import Image from "next/image";
import profileBg from "../data/background/profileBg.jpg";
import { getImagesfromStorage } from "@/server/posts";
export default function Photos(props) {
  const [imageUrl, setImageUrl] = useState("");
  const getImage = async () => {
    const imageData = await getImagesfromStorage("photos/" + props?.photo);

    setImageUrl(
      `https://adefwkbyuwntzginghtp.supabase.co/storage/v1/object/public/photos/${props?.photo}`
    );
  };
  useEffect(() => {
    getImage();
  }, []);


  return (
    <>
      <Card>
        <div className="w-full h-full grid grid-cols-1 gap-4 p-2">
          <div >
            <Image
              src={imageUrl}
              height={200}
              width={200}
              alt="photos"
              className="rounded-md md:h-full w-full"
            ></Image>
          </div>
        </div>
      </Card>
    </>
  );
}
