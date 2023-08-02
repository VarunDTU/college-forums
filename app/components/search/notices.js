import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "flowbite-react";
import Link from "next/link";

export default function Notice_section() {
  const [isLoading, setIsLoading] = useState(true);
  const [notices, setnotices] = useState([]);
  var raw = "";

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(process.env.NEXT_PUBLIC_NOTICE_URL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const x = result.slice(0, 10);
        setnotices(x);
        notices.sort((a, b) => {
          return a.date > b.date;
        });

        if (result.length > 0) setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="w-full h-60 bg-black flex items-center justify-center">
      {isLoading ? (
        <div className=" flex text-2xl items-center justify-center ">Loading....</div>
      ) : (
        <Carousel>
          {notices.map((a) => {
            return (
              <div className="flex flex-col">
                <div className="text-md flex items-center justify-center">
                  {a.title}
                </div>
                <div className="flex flex-col items-center text-blue-800 ">
                  {a.urls.map((links) => {
                    return (
                      <Link
                        className="hover:text-purple-400 flex items-center justify-center"
                        href={`${links}`}
                      >
                        {links}z
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

{
  /* {isLoading ? <p>Loading...</p> : <div>{notices.slice(0,10).map((a)=>{return (<div>{a.title}</div>)})}</div>} */
}
