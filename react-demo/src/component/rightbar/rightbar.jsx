import "./rightbar.css"
import Online from "../online/online"
import { users } from "../../dummydata";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Rightbar({user}) {
  const [friends, setFriends] = useState([]);
  const { user: currentuser, dispatch } = useContext(Authcontext);
  const [follow, setFollow] = useState(false); // Initialize follow state to false initially

  useEffect(() => {
    if (currentuser && user) {
      // Check if currentUser and user are defined
      setFollow(currentuser.followings.includes(user._id));
    }
  }, [currentuser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user && user._id) {
          // Check if user and user._id are defined
          const friendList = await axios.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getFriends();
  }, [user]);

  const handleclick= async () => {
    try {
      if (user && currentuser) {
        // Check if user and currentUser are defined
        if (follow) {
          await axios.put(`/users/${user._id}/unfollow`, { userid: currentuser._id });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(`/users/${user._id}/follow`, { userid: currentuser._id });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
      }
    } catch (err) {
      console.error(err);
    }
    setFollow(!follow);
  };
  const Homerightbar = () => {
    return (
      <>
        <div className="birthdaycontainer">
          <img src={`${PF}11.png`} alt="" className="birthdayimg" />
          <span className="birthdaytext">
            <b>Rohit Sharma</b> and <b>3 other freinds</b> have a birthday today
          </span>
        </div>
        <div>
          <div className="rightbaradd">
            <img src={`${PF}10.jpeg`} alt="" className="rightbaradd" />
          </div>
          <h4 className="rightbartitle">Online Friends</h4>
          <ul className="rightbarfriendlist">
            {users.map((u) => (
              < Online key={u._id} users={u} />
            ))}

          </ul>
        </div>
      </>
    );
  };
  const Profilerightbar = () => {
    return (
      <>
      {user.username!==currentuser.username  && (
        <button className="rightbarfollowbutton" onClick={handleclick}>
          {follow?"Unfollow":"Follow"}
          {follow?<RemoveIcon/>:<AddIcon/>}
        </button>
      )}
        <h4 className="rightbartitle"> User information</h4>
        <div className="rightbarinfo">
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey">City:</span>
            <span className="rightbarinfovalue">{user.city}</span>
          </div>
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey">From:</span>
            <span className="rightbarinfovalue">{user.from}</span>
          </div>
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey">Relationship:</span>
            <span className="rightbarinfovalue">{user.relationship === "1" ? "single" : "married"}</span>
          </div>
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey"></span>
            <span className="rightbarinfovalue"></span>
          </div>
        </div>
        <h4 className="rightbartitle"> User friends</h4>
        <div className="rightbarfollowings">
          {friends.map((friend) => (
            <Link to={"/profile/"+friend.username}style={{textDecoration:"none"}}>
            <div className="rightbarfollowing">
              <img src={friend.profilepicture == " " ? PF + "/20.png" : PF + friend.profilepicture} alt="" className="rightbarfollowingimg" />
              <span className="rightbarfollowingname" >{friend.username}</span>
            </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarwrapper">
        {user ? <Profilerightbar /> : <Homerightbar />}
      </div>

    </div>
  );
}
