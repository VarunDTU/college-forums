import { useEffect, useState } from "react";
import axios from "axios";
export default function Notice_section() {
  //const response = await fetch(process.env.NEXT_PUBLIC_NOTICE_URL)
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const client = axios.create({
    baseURL: "https://dtu-unofficial-api.hop.sh",
  });
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://dtu-unofficial-api.hop.sh",
    data: data,
  };
  useEffect(() => {
    client
      .request(config)
      .then((response) => {
        setPosts(response.data);
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-screen h-60 bg-black flex items-center justify-center">
      <button className="w-40 flex justify-center">
        {isLoading ? <p>Loading...</p> : <p>No profile data</p>}
      </button>
    </div>
  );
}
