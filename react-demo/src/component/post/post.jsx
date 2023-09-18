import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { Authcontext } from "../../context/Authcontext";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [islike, setIslike] = useState(false)
  const [user, setUser] = useState({})
  const { user: currentuser } = useContext(Authcontext);
  useEffect(() => {
    setIslike(post.likes.includes(currentuser._id));
  }, [currentuser._id, post.likes]);
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(`/users/?userId=${post.userId}`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchuser();
  }, [post.userId])
  const likehandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentuser._id })
    }
    catch (err) {
      console.log(err);
    }
    setLike(islike ? like - 1 : like + 1);
    setIslike(!islike);
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="post">
      <div className="postwrapper">
        <div className="posttop">
          <div className="posttopleft">
            <Link to={`profile/${user.username}`} >
              <img src={user.profilepicture == " " ? PF + "/20.png" : PF + user.profilepicture} alt=" " className="postprofileimg" />
            </Link>
            <span className="postusername">{user.username}</span>
            <span className="postdate">{format(post.createdAt)}</span>
          </div>
          <div className="posttopright">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postcenter">
          <span className="posttext">{post?.desc}</span>
          <img src={PF + post.img} alt="retry" className="postimg" />
        </div>
        <div className="postbottom">
          <div className="postbottomleft">
            <img src={`${PF}5.jpeg`} alt="" className="likeicon" onClick={likehandler} />
            <img src={`${PF}6.jpeg`} alt="" className="likeicon" onClick={likehandler} />
            <span className="postlikecounter">{like} people like it</span>
          </div>
          <div className="postbottomright">
            <span className="postcommenttext">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
