"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initfirebase } from "./firebase/auth";
import Link from "next/link";
import SearchBar from "./components/search/searchBar";
export default function Navbar() {
  initfirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  var isUserAuthenticated = false;
  const [user, loading] = useAuthState(auth);
  if (user) {
    isUserAuthenticated = true;
  }
  const Signin = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  return (
    <div className="navbar bg-base-100 z-50 absolute">
      <div className="flex-1">
        <Link
          href={{ pathname: "/" }}
          className="btn btn-ghost normal-case text-xl"
        >
          Student Forums
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {isUserAuthenticated ? <SearchBar></SearchBar> : <div></div>}
        </div>
        {isUserAuthenticated ? (
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => auth.signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div onClick={Signin}>Signin</div>
        )}
      </div>
    </div>
  );
}
