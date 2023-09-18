import "../feed/feed.css"
import Share from "../share/share"
import Post from "../post/post"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
 const { user } = useContext(Authcontext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("posts/timeline/"+user._id );
        setPosts(res.data.sort((p1,p2)=>
        {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
      <div className="feedwrapper">
      {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
