import React, { useState, useEffect } from "react";
import "./GeneralPage.css";
import axios from "axios";

const GeneralPage = () => {
    const [input, setInput] = useState("");
    const [getData, setGetData] = useState([]);


    const changeHandler = (event) => {
        setInput(event.target.value);
    };

    const userName = localStorage.getItem("username");
    const sendButtonHandler = (event) => {
        event.preventDefault();
        axios
            .post("https://slack-clone-c6103-default-rtdb.firebaseio.com/general_sms/.json", {
                sms: input,
                user: userName,
            })
            .then(() => {
                getDataHandler();
            })
            .catch((err) => {
                console.log(err);
            });
        setInput("");
    };
    const getDataHandler = () => {
        axios
            .get("https://slack-clone-c6103-default-rtdb.firebaseio.com/general_sms.json")
            .then((response) => {
                const transformedData = [];
                for (let key in response.data) {
                    const dataObj = {
                        id: key,
                        sms: response.data[key].sms,
                        user: response.data[key].user,
                    };
                    transformedData.push(dataObj);
                }
                setGetData(transformedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getDataHandler();
    }, []);

    const deleteHandler = (id) => {
        axios
            .delete(
                `https://slack-clone-c6103-default-rtdb.firebaseio.com/general_sms/${id}.json`
            )
            .then(() => getDataHandler())
            .catch();
    };
    return (
        <div className="general_wrapper">
            <p className="general">
                <div>
                    <i className="fa-solid fa-hashtag"></i>general{" "}
                </div>
            </p>
            <p className="general_bookmark">+ Add a bookmark</p>
            <div className="general_sms_scroller">
                <div className="general_mid">
                    <div>
                        <i className="fa-solid fa-bullhorn"></i>
                        <p>
                            <span>
                                You’re looking at the<a> # general</a> channel
                            </span>
                            <br />
                            This is the one channel that will always include everyone. It’s a
                            great spot for announcements and team-wide conversations.
                            <a>Edit description</a>
                        </p>
                    </div>
                    <p className="general_add_people">
                        <i className="fa-solid fa-user-plus"></i>
                        Add people
                    </p>

                    <p className="general_date">
                        Sunday, March 26th <i className="fa-solid fa-caret-down"></i>
                    </p>
                </div>
                <div className="general_bottom">
                    <div>
                        <i className="fa-solid fa-user-tie"></i>
                        <p>
                            {userName.toUpperCase()}
                            <span className="general_time">12:20PM</span>
                            <br />
                            <span className="join_general">joined #general.</span>
                        </p>
                    </div>
                    <ul>
                        {getData.map((ele) => (
                            <li key={ele.id}>
                                <section>
                                    {" "}
                                    <h5>
                                        {ele.user}
                                        <span> 2:05 PM</span>
                                    </h5>
                                    <p>{ele.sms}</p>
                                </section>
                                <i
                                    onClick={() => {
                                        deleteHandler(ele.id);
                                    }}
                                    className="fa-solid fa-trash"
                                ></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="general_inputbox">
                <form onSubmit={sendButtonHandler}>
                    <input
                        type="text"
                        placeholder="Message # general"
                        name="sms"
                        value={input}
                        onChange={changeHandler}
                        required
                    />
                    <button type="submit">
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GeneralPage;
