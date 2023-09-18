
import { Chat, RssFeed, } from "@mui/icons-material"
import "./sidebar.css"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import Closefreinds from "../closefreinds/closefreinds";
import { users } from "../../dummydata";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <ul className="sidebarlist">
          <li className="sidebalistitem">
            <RssFeed className="sidebaricon" />
            <span className="sidebarlistitemtext">Feed</span>
          </li>
          <li className="sidebalistitem">
            <Chat className="sidebaricon" />
            <span className="sidebarlistitemtext">Chat</span>
          </li>
          <li className="sidebalistitem">
            <PlayCircleIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">Video</span>
          </li>
          <li className="sidebalistitem">
            <GroupIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">Group</span>
          </li>
          <li className="sidebalistitem">
            <BookmarkIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">Bookmark</span>
          </li>
          <li className="sidebalistitem">
            <QuestionMarkIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">Question</span>
          </li>
          <li className="sidebalistitem">
            <WorkOutlineOutlinedIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">Jobs</span>
          </li>
          <li className="sidebalistitem">
            <EventIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">Events</span>
          </li>
          <li className="sidebalistitem">
            <SchoolIcon className="sidebaricon" />
            <span className="sidebarlistitemtext">courses</span>
          </li>
        </ul>
        <button className="sidebarbutton">Show more</button>
        <hr className="sidebarhr" />
        <ul className="sidebarfreindlist">
          {users.map((u) =>
          (
            <Closefreinds key={u._id} clf={u} />
          ))}

        </ul>
      </div>
    </div>
  )
}
