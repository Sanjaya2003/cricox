import Feed from "../../component/feed/feed"
import Rightbar from "../../component/rightbar/rightbar"
import SideBar from "../../component/sideBar/sidebar"
import Topbar from "../../component/topbar/Topbar"
import "./Home.css"
export default function home() {
  return (
    <>
      <Topbar />
      <div className="homecontainer">
        <SideBar />
        <Feed />
        <Rightbar />

      </div>
    </>
  )
}
