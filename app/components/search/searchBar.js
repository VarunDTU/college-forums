import { useState } from "react";
import Newpost from "../../newpost/newpost";

export default function SearchBar(props) {
  return (
    <div
      className={`flex  ${
        props.small ? "flex-col" : "flex-row"
      } justify-evenly`}
    >
      {/* <div className="flex items-center justify-center">
        <div className="flex border-2 rounded">
          <input
            type="text"
            className={`px-4 py-2 ${props.small ? "w-20" : "w-50"}`}
            placeholder="Search..."
          />
          <button className="flex items-center justify-center px-4 border-l">
            <svg
              className="w-3 h-3 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div> */}
      <div>
        <button
          className="btn bg-transparent m-1 bordered border-slate-900"
          onClick={() => document.getElementById("my_modal_1").showModal()}

        >
          New Post
        </button>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <Newpost />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
}
