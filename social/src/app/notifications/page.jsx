import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Card from "@/components/Card";
import Image from "next/image";

export default function page() {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col ">
        <h2 className="w-full text-center p-2 text-4xl shadow-md mt-10">
         Notifications
        </h2>
        <Card>
          <div className="w-full h-full p-4 flex items-center ">
           <div className="h-full mr-6 p-2">
            <Image src={""} height={70} width={70} className="rounded-full shadow-md "></Image>
           </div>
           <p>
              <Link href={"/profile"}>
                <span className="font-bold">Onkar kakade</span> liked  a
              </Link>

              <span className="font-bold  text-blue-500"> post</span>
            </p>
          </div>
        </Card>



        <Card>
          <div className="w-full h-full p-4 flex items-center ">
           <div className="h-full mr-6 p-2">
            <Image src={""} height={70} width={70} className="rounded-full shadow-md "></Image>
           </div>
           <p>
              <Link href={"/profile"}>
                <span className="font-bold">Onkar kakade</span> liked  a
              </Link>

              <span className="font-bold  text-blue-500"> post</span>
            </p>
          </div>
        </Card>


        <Card>
          <div className="w-full h-full p-4 flex items-center ">
           <div className="h-full mr-6 p-2">
            <Image src={""} height={70} width={70} className="rounded-full shadow-md "></Image>
           </div>
           <p>
              <Link href={"/profile"}>
                <span className="font-bold">Onkar kakade</span> liked  a
              </Link>

              <span className="font-bold  text-blue-500"> post</span>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
