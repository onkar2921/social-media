"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Card from "@/components/Card";
import Image from "next/image";
import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "@/context/UserContextProvider";
import { getAllNotifications } from "@/server/notification";
import { delteNotification } from "@/server/notification";

export default function page() {
  const { state } = useContext(userContext);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const data = await getAllNotifications();

    if (data) {
      // console.log("all notification data",data)
      const newNotificationData = data?.filter(
        (item) => item?.userId !== state?.userId
      );
      setNotifications(newNotificationData);
    }
  };
  useEffect(() => {
   

    getNotifications();
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    const data = await delteNotification(notificationId);
    getNotifications();
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col ">
        <h2 className="w-full text-center p-2 text-4xl shadow-md mt-10">
          Notifications
        </h2>

        {notifications &&
          notifications?.map((item) => {
            return (
              <>
                <Card>
                  <div className="w-full h-full p-4 flex items-center ">
                    <div className="h-full mr-6 p-2"></div>
                    <p className="flex items-center justify-around">
                      <Image
                        src={item?.user?.avatar}
                        height={40}
                        width={50}
                        alt="profile image"
                        className="rounded-full shadow-sm mr-6"
                      ></Image>

                      <Link href={`/profile/${item?.user?.id}`}>
                        <span className="font-bold ">{item?.user?.name}</span>{" "}
                        {item?.notify}
                      </Link>
                      <button
                        className="ml-4 bg-black rounded-md text-red-500 p-1"
                        onClick={() => handleDeleteNotification(item?.id)}
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                </Card>
              </>
            );
          })}
      </div>
    </Layout>
  );
}
