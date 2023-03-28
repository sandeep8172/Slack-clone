import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <p>
                    coders <i className="fa-solid fa-circle-chevron-down drop_down"></i>
                </p>
                <i className="fa-regular fa-message new_message"></i>
            </div>

            <div className="browser_slack">
                <Link to={'/home'} style={{ textDecoration: 'none' }}> <p>
                    <i className="fa-solid fa-ellipsis-vertical"></i>Browser Slack
                </p></Link>
            </div>

            <div className="sidebar_content">
                <p><i className="fa-solid fa-caret-down"></i>Channels</p>
                <Link style={{ textDecoration: 'none' }} to={'/home/general'}><p><i className="fa-solid fa-hashtag"></i> general</p></Link>
                <Link style={{ textDecoration: 'none' }} to={'/home/random'}><p><i className="fa-solid fa-hashtag"></i> random</p></Link>
                <Link style={{ textDecoration: 'none' }} to={'/home/slack'}><p> <i className="fa-solid fa-hashtag"></i>slack-clone</p></Link>
                <p><i className="fa-regular fa-square-plus"></i>Add channels</p>
            </div>
            <div className="sidebar_bottom">
                <p><i className="fa-solid fa-caret-down"></i>Direct messages</p>
                <p><i className="fa-solid fa-user-tie"></i>user profile</p>
                <p><i className="fa-regular fa-square-plus"></i>Add coworkers</p>
            </div>
        </div>
    );
};

export default Sidebar;
