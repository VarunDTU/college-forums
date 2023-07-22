import { getAuth } from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { initfirebase, initfirestore } from "../firebase/auth";

export default function Newpost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const db = initfirestore();

  //console.log(db);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const NewThread = async () => {
    if (title != "" && content != "") {
      const c_time =new Date();
      const time=c_time.toString()
      const docRef = await addDoc(collection(db, "post"), {
        username: user.displayName,
        likes: "0",
        userId: user.uid,
        content: content,
        userProfile: user.photoURL,
        title: title,
        time: time,
      });
      await setDoc(doc(db, "posts", docRef.id), {
        likes: "0",
        title: title,
        time: time,
      });
      setTitle("");
      setContent("");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="w-full text-lg textarea-bordered textarea mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        placeholder="Body"
        value={content}
        className="textarea textarea-bordered textarea-lg w-full"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="p-5 m-5 hover:border hover:border-spacing-8 transition-all focus:bg-white focus:text-black " onClick={NewThread}>Submit</button>
    </div>
  );
}
