import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef } from "react";
import { Authcontext } from "../../context/Authcontext"
import { useState } from "react";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Share() {
    const { user } = useContext(Authcontext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const submithandler = async (e) => {
        e.preventDefault();
        const newpost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData();
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const filename = "file-" + uniqueSuffix + "-" + file.name;
            data.append("name", filename);
            data.append("file", file);
            
            newpost.img = filename;
            console.log(file);

            try {
                await axios.post("/upload", data);
            }
            catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post("/posts", newpost);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="share">
            <div className="sharewrapper">
                <div className="sharetop">
                    <img src={user.profilepicture == " " ? PF + "/20.png" : PF + user.profilepicture} alt="" className="shareprofileimg" />
                    <input type="text" className="shareinput" placeholder={"What's in your mind " + user.username + "?"} ref={desc} />
                </div>
                <hr className="sharehr" />
                {file && (
                    <div className="shareimgcontainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareimg" />
                        <CancelIcon className="sharecancelimg" onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="sharebuttom" onSubmit={submithandler}>
                    <div className="shareoptions">
                        <label htmlFor="file" className="shareoption">
                            <PermMediaIcon htmlColor="tomato" className="shareicon" />
                            <span className="shareoptiontext">Photo or Video</span>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                        </label>
                        <div className="shareoption">
                            <LabelIcon htmlColor="blue" className="shareicon" />
                            <span className="shareoptiontext">Tag</span>
                        </div>
                        <div className="shareoption">
                            <LocationOnIcon htmlColor="green" className="shareicon" />
                            <span className="shareoptiontext">Location</span>
                        </div>
                        <div className="shareoption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="shareicon" />
                            <span className="shareoptiontext">Feelings</span>
                        </div>
                    </div>
                    <button className="sharebutton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
