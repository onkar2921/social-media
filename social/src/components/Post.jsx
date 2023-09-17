"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import user from "../data/icons/user.png";
import like from "../data/icons/like.png";
import comment from "../data/icons/comment.png";
import share from "../data/icons/share.png";
import send from "../data/icons/send.png";
import deleteIcon from "../data/icons/deleteIcon.png";
// import report from "../data/icons/report.png";
import close from "../data/icons/close.png";
import bookmark from "../data/icons/bookmark.png";
import bell from "../data/icons/bell.png";
import { useContext } from "react";
import { userContext } from "@/context/UserContextProvider";
import { getImagesfromStorage } from "@/server/posts";
import { addBookmark } from "@/server/posts";
import { deletePostFromTbale } from "@/server/posts";
import { postContext } from "@/context/PostContextProvider";

//likes

import { postLike } from "@/server/posts";
import { dislikePost } from "@/server/posts";
import { getLikeCount } from "@/server/posts";

//comments

import { addComment } from "@/server/posts";
import { getAllComment } from "@/server/posts";
import { removeComment } from "@/server/posts";

//specific user data
import { getUserInfo } from "@/server/user";

//notifications

import { addNotification } from "@/server/notification";

export default function Post(props) {

  
  const { postDispatch, likeRefresh, allComments } = useContext(postContext);

  const { state } = useContext(userContext);

  // console.log("user-----------------------------------",state)

  const [userID, setUserID] = useState("");

  useEffect(() => {
    setUserID(state?.userId);
  }, [state?.userId]);

  const addToBookmark = async () => {
    const data = await addBookmark(userID, props?.id);

    if (data) {
      alert("add to bookmark");
    }
    console.log("failed in add to bookmark");
  };

  const deletepost = async () => {
    const data = await deletePostFromTbale(props?.id, userID);
    postDispatch({ type: "SETREFRESH" });
    if (data) {
      alert("post deleted");
    }
  };

  const [imageUrl, setImageUrl] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const getImage = async () => {
    const imageData = await getImagesfromStorage("photos/" + props?.photo);

    setImageUrl(
      `https://adefwkbyuwntzginghtp.supabase.co/storage/v1/object/public/photos/${props?.photo?.path}`
    );
  };
  useEffect(() => {
    getImage();
  }, []);

  const [likestatus, setLikeStatus] = useState(false);

  const Notify = async () => {
    // alert("hit notify front");
    const notifyData = await addNotification(userID, props?.id, "liked a post");
    if (notifyData) {
      // console.log("notfy for liked");
    }
  };

  const handleLike = async () => {
    const data = await postLike(userID, props?.id);
    // console.log("post like data",data)
    setLikeStatus(true);
    localStorage.setItem("verifyLike", true);

    Notify();

    if (data) {
      alert("post is liked");
    }
  };

  const [refresh, setRefresh] = useState(false);

  const handleDislkie = async () => {
    try {
      const data = await dislikePost(userID, props?.id);
      if (data) {
        alert("post is disliked");
        // console.log("disliked post data", data);
        localStorage.setItem("verifyLike", false);

        setLikeStatus(false);

        const newdata = await likeCount();
        if (!newdata) {
          setCount(0);
        }
      }
      setRefresh(true);
      postDispatch({ type: "SETLIKEREFRESH" });
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const [count, setCount] = useState(0);

  const likeCount = async () => {
    const data = await getLikeCount(props?.id);

    if (data) {
      // console.log("like count data------",data)
      setCount(data);
    }
  };
  useEffect(() => {
    const check = localStorage.getItem("verifyLike");
    if (check && count > 1) {
      setLikeStatus(!likestatus);
    }
  }, []);

  useEffect(() => {
    likeCount();
  }, [likestatus, props?.id, refresh, count]);

  //comment

  // const [allComments,setAllComments]=useState([])
  const [commentRefresh, setCommentRefresh] = useState(false);

 
  const functionCountComment = () => {
    const filterComments = allComments?.filter(
      (item) => item?.post === props?.id
    );
    const len = filterComments?.length;
    setCommentCount(len);
  };

  // console.log("props----",props)

  const [text, setText] = useState("");
  const handleComment = async () => {
    // alert("hit comment front")
    const data = await addComment(userID, props?.id, text);

    alert("comment added");
    setText("");
    fetchComments();
    setCommentRefresh(!commentRefresh);
    // functionCountComment()
  };

  const fetchComments = async () => {
    const data = await getAllComment();
    postDispatch({ type: "SETCOMMENTS", payload: data });
  };

  //   console.log("comments data",allComments)

  const handleDeleteComment = async (commentId) => {
    const data = await removeComment(commentId);
    fetchComments();
    alert("comment deleted");
    setCommentRefresh(!commentRefresh);
    // functionCountComment()
  };

  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetchComments();
  }, [commentRefresh]);

  useEffect(() => {
    functionCountComment();
  }, [commentRefresh]);

  const [show, setShow] = useState(false);

  const seeComments = async () => {
    // alert("hited to show")
    setShow(!show);
  };

  const [specificUser, setSpecificUser] = useState("");

  
  function timeAgo(timestamp) {
    const currentDate = new Date();
    const postDate = new Date(timestamp);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks >= 1) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days >= 1) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours >= 1) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes >= 1) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

  const fetchUser = async () => {
    const data = await getUserInfo(props?.alldata?.author);
    setSpecificUser(data[0]);
    // console.log("all users data",data[0])
  };

  const [postTime, setPostTime] = useState(0);

  useEffect(() => {
    fetchUser();

    const timestamp = props?.alldata?.created_at;
    const timeAgoString = timeAgo(timestamp);
    // console.log("Time ago:", timeAgoString);
    setPostTime(timeAgoString);
  }, []);


  const generatedURLPath = `/profile/${props?.alldata?.author}`;

  const handleLinkClick = () => {
    const generatedURLPath = `/profile/${props?.alldata?.author}`;
    // console.log("Generated URL Path:", generatedURLPath);

    // Navigate to the generated URL path
    // console.log("url",generatedURLPath)
    alert("url",generatedURLPath)
    // router.push(generatedURLPath);
    router.push({
      pathname: generatedURLPath,
      query: { profileId: props?.alldata?.author } 
    });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col mb-4 border p-1">
        <div className="w-full h-full flex p-2 ">
          <Link href="/profile">
            <div>
              <Image
                src={props?.avatar}
                height={40}
                width={50}
                alt="profile image"
                className="rounded-full shadow-sm mr-6"
              ></Image>
            </div>
          </Link>
          <div className=" w-full h-full flex items-center justify-between  ">
            <div className="w-full h-full">
              <p>
                {/* <Link href={`/profile/${props?.alldata?.author}`}>
                  <span className="font-bold">{specificUser?.name}</span> shared a
                </Link> */}

                <Link href={generatedURLPath} onClick={handleLinkClick}>
                  <span className="font-bold">{specificUser?.name}</span> shared
                  a
                </Link>
                <span className="font-bold  text-blue-500"> post</span>
              </p>
              <p>{postTime}</p>
            </div>

            <div className="relative">
              <button onClick={() => setDropDown(!dropDown)}>...</button>

              <div className="relative">
                {dropDown && (
                  <div className="w-[300px] flex flex-col absolute top-5  right-20 bg-white border-md mb-4  shadow-md rounded-md  p-2">
                    <div className="flex p-2 ">
                      <Image
                        src={bookmark}
                        height={10}
                        width={20}
                        alt="save-post"
                      />
                      <p
                        className="ml-3 cursor-pointer"
                        onClick={addToBookmark}
                      >
                        Save Post
                      </p>
                    </div>
                    <div className="flex p-2 ">
                      <Image
                        src={bell}
                        height={10}
                        width={20}
                        alt="notification"
                      />
                      <p className="ml-3">Notification</p>
                    </div>
                    <div className="flex p-2 ">
                      <Image
                        src={close}
                        height={10}
                        width={20}
                        alt="hide-post"
                      />
                      <p
                        className="ml-3 cursor-pointer"
                        onClick={props?.onRemoveBookmark}
                      >
                        Hide Post
                      </p>
                    </div>
                    <div className="flex p-2">
                      <Image
                        src={deleteIcon}
                        height={10}
                        width={20}
                        alt="delete"
                      />
                      <p className="ml-3 cursor-pointer" onClick={deletepost}>
                        Delete
                      </p>
                    </div>
                    {/* <div className="flex p-2">
                      <Image src={report} height={10} width={20} alt="report" />
                      <p className="ml-3">Report</p>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* image div */}
        <div className="w-full h-full  rounded-md shadow-md p-3  md:block xs:flex items-center justify-center mt-4 mb-4">
          {/* <Image
            src={photo}
            height={100}
            width={200}
            alt="profile image"
            className="rounded-full shadow-sm mr-6"
          ></Image> */}

         {
          props?.photo &&  <Image
          src={imageUrl}
          height={100}
          width={400}
          alt="post image"
          className="rounded-md mb-2 shadow-sm mr-6 w-full"
        ></Image>
         }

          <p>{props?.content}</p>
        </div>
        <div className="w-full h-full rounded-md shadow-md p-3 flex items-center mb-4">
          <div className="flex mr-6">
            {likestatus ? (
              <Image
                src={like}
                height={10}
                width={20}
                alt="profile image"
                className="rounded-md shadow-sm mr-6 cursor-pointer"
                onClick={handleDislkie}
              ></Image>
            ) : (
              <Image
                src={like}
                height={10}
                width={20}
                alt="profile image"
                className="rounded-md shadow-sm mr-6 cursor-pointer"
                onClick={handleLike}
              ></Image>
            )}
            <p>{count}</p>
          </div>
          <div className="flex mr-6">
            <Image
              src={comment}
              height={10}
              width={20}
              alt="profile image"
              className="rounded-md shadow-sm mr-6"
              onClick={seeComments}
            ></Image>

            <p>{commentCount}</p>
          </div>

          <div className="flex mr-6">
            <Image
              src={share}
              height={10}
              width={20}
              alt="profile image"
              className="rounded-sm shadow-sm mr-6"
            ></Image>
            <p>4</p>
          </div>
        </div>

        <div className="w-full flex align-center justify-center flex-col p-2  bg">
          {show && (
            <>
              {props?.comments?.map((item) => {
                if (item?.post === props?.id) {
                  return (
                    <>
                      <div className="flex w-full items-center m-2 ">
                        <h2 className="text-center flex mr-2 rounded-md p-2 bg-slate-300">
                          {item?.user_name}
                        </h2>
                        <p className="w-1/2 m-2 shadow-lg pl-2">
                          {item?.comment}
                        </p>
                        {userID === item?.user && (
                          <button onClick={() => handleDeleteComment(item?.id)}>
                            delete
                          </button>
                        )}
                      </div>
                    </>
                  );
                }
              })}
            </>
          )}
        </div>

        <div className="flex w-fll h-full">
          <Image
            src={state?.avatar}
            height={40}
            width={50}
            alt="profile image"
            className="rounded-full shadow-sm mr-6 ml-2"
          ></Image>
          <div className="flex items-center w-full p-2">
            <input
              type="text"
              className="focus:outline-none rounded-full ml-2 p-2 mr-3 w-full"
              placeholder="Leave a comment "
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="rounded-full px-3 py-1 bg-blue-400">
              <Image
                src={send}
                height={20}
                width={30}
                alt="profile image"
                className=" shadow-sm mr-6 cursor-pointer"
                onClick={handleComment}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
