"use client";
import { useEffect, useState } from "react";
import { initfirebase, initfirestore } from "./firebase/auth";
import { BsSearch } from "react-icons/bs";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import Link from "next/link";
import {
  querySnapshot,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import SearchBar from "./components/search/searchBar";
import Newpost from "./newpost/newpost";

export default function Home() {
  initfirebase();
  const db = initfirestore();
  const [items, setitems] = useState([]);
  const [itemsS, setitemsS] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("likes"));
    const qS = query(collection(db, "posts"), orderBy("time"));
    const posts = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setitems(arr);
    });
    const postsS = onSnapshot(qS, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setitemsS(arr);
    });
  }, []);
  const [upvotes, Setvotes] = useState(false);
  const upvoted = () => {
    Setvotes(true);
  };
  const downvoted = () => {
    Setvotes(false);
  };
  return (
    <div className="py-20 flex flex-col min-h-screen bg-slate-950  justify center items-center">
  
      <div className="flex flex-col w-full lg:flex-row h-full ">
        <div className=" sm:w-full  p-4  place-items-center ">
          <h1 className="p-5 m-1 w-full items-center justify-center flex text-3xl ">
            Top Threads
          </h1>
          <div className="   max-h-full overflow-y-scroll overflow-x-hidden border-2 m-2 scrollbar-thin scrollbar-thumb-blue-950 scrollbar-track-white ">
            {items.map((post) => {
              return (
                  <Link href={{ pathname: `/posts/post/${post.id}` }}>
                <div className="text-left w-full p-2 hover:bg-slate-700  flex flex-row items-center transition-all ">
                    {post.title}
                </div>
                  </Link>
              );
            })}
          </div>
        </div>
        <div className=" place-items-center md:w-1/4 p-4 w-full ">
          <h1 className="p-6 w-full items-center justify-center flex text-xl">
            Recent Threads
          </h1>
          <div className="   max-h-full overflow-y-scroll overflow-x-hidden border-2 m-2 scrollbar-thin scrollbar-thumb-blue-950 scrollbar-track-white">
            {itemsS.map((post) => {
              return (
                <div className="text-left w-full p-2 hover:bg-slate-700  transition-all ">
                  <Link href={{ pathname: `/posts/post/${post.id}` }}>
                    {post.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
