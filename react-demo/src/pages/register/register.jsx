import "./register.css"
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const passwordagain = useRef();
    const navigate = useNavigate();
    const handleclick = async (e) => {
        e.preventDefault();
        if (passwordagain.current.value !== password.current.value) {
            passwordagain.current.setCustomValidity("passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                
                await axios.post("/auth/register", user);
                navigate('/login');
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className="login">
            <div className="loginwrapper">
                <div className="loginleft">
                    <h3 className="loginlogo">Cricsocial</h3>
                    <span className="logindesc">connect with friends and the world around you on Cricsocial.</span>
                </div>
                <div className="loginright">
                    <form className="loginbox" onSubmit={handleclick}>
                        <input type="text" className="logininput" placeholder="Username" ref={username} required />
                        <input type="Email" className="logininput" placeholder="Email" ref={email} required />
                        <input type="password" className="logininput" placeholder="Password" ref={password} required minLength="6" />
                        <input type="password" className="logininput" placeholder="Password Again" ref={passwordagain} required />
                        <button className="loginbutton" type="submit" >Sign Up</button>

                        <button className="loginregisterbtn">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
