"use client";
import { useEffect, useState } from "react";
import { initfirestore, initfirebase } from "@/app/firebase/auth";
import {
  querySnapshot,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
export default function Page({ params }) {
  initfirebase();
  const db = initfirestore();
  const [items, setitems] = useState([]);
  const [new_time, setNew_Time] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "post", `${params.id}`), (doc) => {
      setitems(doc.data());
    });
  }, []);

  
  return (
    <div className=" py-20 min-h-screen">
      <div>
        <div class=" p-5">
          <div class="flex items-center">
            <div class="m-2">
              <a href="#">
                <img
                  class="rounded-full w-8"
                  src={items.userProfile}
                  alt="hagnerd profile"
                  loading="lazy"
                />
              </a>
            </div>
            <div>
              <p>
                <a href="#" class="text text-gray-700 text-sm hover:text-black">
                  {items.username}
                </a>
              </p>
              <a href="#" class="text-xs text-gray-600 hover:text-black">
                <div>{items.time}</div>
              </a>
            </div>
          </div>
        </div>
        <div class="pl-12 md:pl-10 xs:pl-10 justify-center">
          <h2 class="text-2xl font-bold mb-2 leading-7 flex justify-center ">
            <div href="#" id="article-link-151230">
              {items.title}
            </div>
          </h2>

          <text class="mb-1 leading-6 flex justify-center break-normal text-center">
            {items.content}
          </text>
          <div class="flex justify-center items-center ">
            <div class=" flex justify-center ">
              <a
                href="#"
                class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black"
              >
                <svg
                  class="inline fill-current "
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                </svg>
                {items.likes}
                <span class="hidden md:inline">&nbsp;likes</span>
              </a>
              <a
                href="#"
                class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black"
              >
                <svg
                  class="inline fill-current"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                </svg>
                20<span class="hidden md:inline">&nbsp;comments</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div>

    {items.title}
      </div>
      <div >{items.username}</div>
      <div>{items.content}</div> */}
    </div>
  );
}
