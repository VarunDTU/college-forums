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
import { doc, getDoc,setDoc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Page({ params }) {
  initfirebase();
  const db = initfirestore();
  const [items, setitems] = useState([]);
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "post", `${params.id}`), (doc) => {
      let arr = [];

      doc.data().postComments.forEach((comments) => arr.push(comments));
      setitems(doc.data());
      setcomments(arr);
    });
  }, []);

  const [newComment, setNewcomment] = useState("");
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const submitComment = () => {
    if (newComment != "") {
      const arr = comments;
      arr.push({
        comment: newComment,
        userId: user.uid,
        userPic: user.photoURL,
        userName: user.displayName,
      });
      console.log(arr);
      const docRef = doc(db, "post", `${params.id}`);
      setDoc(docRef, { postComments: arr }, { merge: true });
      setNewcomment("")
    }
  };

  return (
    <div class="antialiased mx-auto max-w-screen pt-20 min-h-screen">
      <div class="space-y-4">
        <div class="flex">
          <div class="flex-shrink-0 m-3">
            <img
              class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src={items.userProfile}
              alt=""
            />
          </div>
          <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>{items.username}</strong>{" "}
            <span class="text-xs text-gray-400">3:34 PM</span>
            <h1 className="text-xl font-bold p-3">{items.title}</h1>
            <p class="text-sm p-3 ">{items.content}</p>
            <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">
              Replies
            </h4>
            <div class="space-y-4">
              <div class="w-full  rounded-lg border p-2 mx-auto mt-20">
                <div class="px-3 mb-2 mt-2">
                  <textarea
                    placeholder="comment"
                    value={newComment}
                    onChange={(e) => setNewcomment(e.target.value)}
                    class="w-full bg-gray-700 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-gray-800"
                  ></textarea>
                </div>
                <div class="flex justify-end px-4">
                  <input
                    onClick={submitComment}
                    type="submit"
                    class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                    value="Comment"
                  />
                </div>
              </div>
              <div>

              {comments.map((comment) => {
                return (
                  <div class="flex p-2">
                    <div class="flex-shrink-0 mr-3">
                      <img
                        class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                        src={comment.userPic}
                        alt=""
                        />
                    </div>
                    <div class="flex-1 bg-gray-900 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>{comment.userName}</strong>{" "}
                      <span class="text-xs text-gray-400"></span>
                      <p class="text-xs sm:text-sm">{comment.comment}</p>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
