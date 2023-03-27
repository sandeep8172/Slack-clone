import React from "react";
import "./Random.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Random = () => {

    const [input, setInput] = useState("");
    const [getData, setGetData] = useState([]);


    const changeHandler = (event) => {
        setInput(event.target.value);
    };

    const userName = localStorage.getItem("username");
    const sendButtonHandler = (event) => {
        event.preventDefault();
        axios
            .post("https://slack-clone-c6103-default-rtdb.firebaseio.com/random_sms/.json", {
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
            .get("https://slack-clone-c6103-default-rtdb.firebaseio.com/random_sms.json")
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
                `https://slack-clone-c6103-default-rtdb.firebaseio.com/random_sms/${id}.json`
            )
            .then(() => getDataHandler())
            .catch();
    };

    return (

        <div className="random_wrapper">
            <p className="random">
                <div>
                    <i className="fa-solid fa-hashtag"></i>random{" "}
                </div>
            </p>
            <p className="random_bookmark">+ Add a bookmark</p>
            <div className="random_sms_scroller">
                <div className="random_mid">
                    <div>
                        <i className="fa-solid fa-bullhorn"></i>
                        <p>
                            <span>
                                You’re looking at the<a> # random</a> channel
                            </span>
                            <br />
                            This is the one channel that will always include everyone. It’s a
                            great spot for announcements and team-wide conversations.
                            <a>Edit description</a>
                        </p>
                    </div>
                    <p className="random_add_people">
                        <i className="fa-solid fa-user-plus"></i>
                        Add people
                    </p>

                    <p className="random_date">
                        Sunday, March 26th <i className="fa-solid fa-caret-down"></i>
                    </p>
                </div>
                <div className="random_bottom">
                    <div>
                        <i className="fa-solid fa-user-tie"></i>
                        <p>
                            {userName.toUpperCase()}
                            <span className="random_time">12:20PM</span>
                            <br />
                            <span className="join_random">joined #random.</span>
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
            <div className="random_inputbox">
                <form onSubmit={sendButtonHandler}>
                    <input
                        type="text"
                        placeholder="Message # random"
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

export default Random;