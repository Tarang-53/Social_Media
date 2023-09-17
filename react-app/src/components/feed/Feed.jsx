import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from 'axios';
// import { Posts } from "../../dummyData"

export default function Feed() {
  const [posts,setPosts] = useState([]);
 
  useEffect(()=>{
    const fatchPosts = async () => {
      const res = await axios.get("posts/timeline/64a5c9d6d2f5712b56dc8c71");
      setPosts(res.data);
    }
    fatchPosts();
  },[])
  return (
    <div className='feedContainer'>
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (<Post key={p._id} post={p} />)
        )} 

      </div>
    </div>
  )
}
