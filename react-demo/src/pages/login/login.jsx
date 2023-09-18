import "./login.css"
import { useContext } from "react"
import React, { useRef } from 'react';
import { logincall } from "../../apicalls";
import { Authcontext } from "../../context/Authcontext"
export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isfetching, error, dispatch } = useContext(Authcontext);
    const handleclick = (e) => {
        e.preventDefault(); // Note the capital 'P' in 'preventDefault'
        logincall({ email: email.current.value, password: password.current.value }, dispatch);
        console.log(user);

    };

    return (
        <div className="login">
            <div className="loginwrapper">
                <div className="loginleft">
                    <h3 className="loginlogo">Cricsocial</h3>
                    <span className="logindesc">connect with friends and the world around you on Cricsocial.</span>
                </div>
                <div className="loginright">
                    <form className="loginbox" onSubmit={handleclick}>
                        <input type="text" className="logininput" placeholder="Email" ref={email} required />
                        <input type="password" className="logininput" placeholder="Password" ref={password} required />
                        <button className="loginbutton" type="submit" disabled={isfetching}>{isfetching ? "Loading..." : "Log In"} </button>
                        <span className="loginforget">Forget Password?</span>
                        <button className="loginregisterbtn">{isfetching ? "Loading..." : "Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
