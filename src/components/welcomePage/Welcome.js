import React from 'react'
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    const logoutButtonHandler = () => {
        navigate("/", { replace: true });
        navigate(0);
    };

    return (
        <div className='welcome_wrapper'>
            <div className='welcome'><h1> Welcome to Slack </h1><br />
                <p>Create and manage chat in your own way </p>
                <button onClick={logoutButtonHandler}>Sign-out</button>
            </div>
        </div>
    )
}

export default Welcome;