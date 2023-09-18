import "./profile.css"
import Feed from "../../../component/feed/feed"
import Rightbar from "../../../component/rightbar/rightbar"
import SideBar from "../../../component/sideBar/sidebar"
import Topbar from "../../../component/topbar/Topbar"
import ".././Home.css"
import React,{ useState,useEffect } from "react";
import axios from "axios"
import {useParams} from "react-router"
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Profile() {
    const username=useParams().username;
    const [user,setUser]=useState({})
    useEffect(() => {
        const fetchuser = async () => {
          try {
            const res = await axios.get(`/users/?username=${username}`);
            setUser(res.data);
            console.log(res.data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
        fetchuser();
      }, [username])
    return (

        <>
            <Topbar />
            <div className="profile">
                <SideBar />
                <div className="profileright">
                    <div className="profilerighttop">
                        <div className="profilecover">
                            <img src={user.coverpicture ==" "? PF+"/21.jpg":user.coverpicture} alt="" className="profilecoverimg" />
                            <img src={user.profilepicture==" " ? PF+"/20.png":user.profilepicture}   alt="" className="profileuserimg" />
                        </div>
                        <div className="profileinfo">
                            <h4 className="profileinfoname">{user.username}</h4>
                           <span className="profileinfodesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profilerightbottom">
                        <Feed username={username}/>
                        <Rightbar  user= {user}/>
                    </div>
                </div>
            </div>
        </>

    )
}
