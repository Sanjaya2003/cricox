import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext"
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Topbar() {
  const { user } = useContext(Authcontext);
  return (
    <div className="topbarcontainer">
      <div className="topbarleft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">Cricsocial</span>
        </Link>
        </div>

      <div className="topbarcenter">
        <div className="searchbar">
          <Search className="searchicon"/>
          <input type="text" placeholder="search for friend,post or video" className="searchinput" />
        </div>
      </div>
      <div className="topbarright">
        <div className="topbarlinks">
          <span className="topbarlink">Homepage</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbaricons">
          <div className="topbariconitem">
            <Person />
            <span className="topbariconbadge">1</span>
          </div>
          <div className="topbariconitem">
            <Chat />
            <span className="topbariconbadge">2</span>
          </div>
          <div className="topbariconitem">
            <Notifications />
            <span className="topbariconbadge">1</span>
          </div>
          <div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilepicture==" " ? PF+"/20.png": PF + user.profilepicture} alt="" className="topbarimg" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
