import "./online.css"
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function online({users}) {
    return (

        <li className="rightbarfriend">
            <div className="rightbarprofileimgcontainer">
                <img src={PF+users.profilepicture} alt="" className="rightbarprofileimg" />
                <span className="rightbaronline"></span>
            </div>
            <span className="rightbarusername">{users.username}</span>
        </li>

    );
}
