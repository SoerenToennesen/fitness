import React from "react";
import MainLogo from "../Photos/logos/mainlogo2.png";
import '../Containers/css/SignInUp.css';

export default function SignIn(props: any) {
    const { setIsLoggedIn, setSignIn } = props;
    return (
        <div className="base-container">
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={MainLogo} alt={"Main logo"}/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Enter username..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter password..." />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btnLogin" onClick={() => setIsLoggedIn(true)}>
                    Sign in
                </button>
                {' '}
                <button type="button" className="btnLogin" onClick={() => setSignIn(false)}>
                    Create user
                </button>
            </div>
        </div>
    )
}

export function SignUp(props: any) {
    const { setSignIn } = props;
    return (
        <div className="base-container">
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={MainLogo} alt={"Main logo"}/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Enter username..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="Enter e-mail..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="Enter password..." />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btnLogin" onClick={() => setSignIn(true)}>
                    Sign up
                </button>
            </div>
        </div>
    )
}
