"use client";
import { useEffect, useState } from "react";
import { initfirebase, initfirestore } from "./firebase/auth";
import { BsSearch } from "react-icons/bs";
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

export default function Home() {
  initfirebase();
  const db = initfirestore();
  const [items, setitems] = useState([]);
  const [itemsS, setitemsS] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"),orderBy("likes"));
    const qS = query(collection(db, "posts"),orderBy("time"));
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

  return (
    <div className="py-20 flex flex-col ">
      <div className="flex flex-col w-full lg:flex-row h-screen">
        <div className=" sm:w-full md:w-2/3 md:mr-10 m-4  place-items-center">
          <h1 className="p-5 m-2 w-full items-center justify-center flex text-3xl p">
            Top Threads
          </h1>
          <div className=" h-full card bg-base-300 ">
            {items.map((post) => {
              return (
                <div className="text-left w-full p-2 hover:bg-slate-700 hover:rounded-box ">
                  <Link href={{ pathname: `/posts/post/${post.id}` }}>
                    {post.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-box place-items-center md:w-1/3 md:ml-10 m-4 ">
          <h1 className="p-5 m-2 w-full items-center justify-center flex text-3xl p">
            Recent Threads
          </h1>
          <div className="  h-full card bg-base-300 place-items-center ">
            {itemsS.map((post) => {
              return (
                <div className="text-left w-full p-2 hover:bg-slate-700 hover:rounded-box justify-center flex">
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
