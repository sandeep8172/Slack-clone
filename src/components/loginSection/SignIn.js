import React from "react";
import "./SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const logHandler = () => {
        setIsLoggedIn(pre => !pre);
    };

    const [value, setValue] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const emailPassHandler = (event) => {
        const data = event.target.value;
        setValue({
            ...value,
            [event.target.name]: data,
        });
    };
    const API_KEY = "AIzaSyBjpA2PfVOHavwbet80uwwCyEBEO9HRXI0";
    const signUpHandler = (event) => {
        event.preventDefault();
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                {
                    email: value.email,
                    password: value.password,
                    returnSecureToken: true,
                }
            )
            .then((response) => {
                setIsLoggedIn(true);
            })
            .catch((err) => alert(err.response.data.error.message));
        setValue({
            username: "",
            email: "",
            password: "",
        });
    };
    const signInHandler = (event) => {
        event.preventDefault();
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {
                    email: value.email,
                    password: value.password,
                    returnSecureToken: true,
                }
            )
            .then((response) => {
                localStorage.setItem("username", value.username);
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                alert("user not found !");
            });
        setValue({
            email: "",
            password: "",
        });
    };
    return (
        <div className="signin_wrapper">
            <div className="container">
                <h1>Welcome to Slack</h1>
                <form onSubmit={isLoggedIn ? signInHandler : signUpHandler}>
                    {!isLoggedIn ? (
                        ""
                    ) : (
                        <>
                            {" "}
                            <label htmlFor="username">Username</label>
                            <br />
                            <input
                                type="text"
                                className="username"
                                placeholder=" Type username"
                                name="username"
                                value={value.username}
                                onChange={emailPassHandler}
                                required
                            />
                        </>
                    )}
                    <br />

                    <label htmlFor="email">E-Mail</label>
                    <br />
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={value.email}
                        onChange={emailPassHandler}
                    />
                    <br />

                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder=" password"
                        name="password"
                        value={value.password}
                        onChange={emailPassHandler}
                    />
                    <br />
                    {isLoggedIn ? (
                        <button type="submit" >
                            Sign-in
                        </button>
                    ) : (
                        <button type="submit" >
                            Sign-up
                        </button>
                    )}
                </form>

                {isLoggedIn ? (
                    <p>
                        New to slack ? Click here to{" "}
                        <button onClick={logHandler}> sign-up </button>
                    </p>
                ) : (
                    <p>
                        Already a member ? Click here to{" "}
                        <button onClick={logHandler}> sign-in </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default SignIn;
