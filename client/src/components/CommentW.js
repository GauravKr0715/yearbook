import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";

import "./writen.css"



function CommentW() {
    const history = useHistory();
    const [search, setSearch] = useState(null);
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState("");
    const [resultToggle, setResultToggle] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("Auth-token")) {
            history.push("/");
        } else {
            getMySentMessages();
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("Auth-token")) {
            history.push("/");
        } else {
            getUsers();
        }
    }, [search]);

    const getMySentMessages = async () => {
        const token = localStorage.getItem("Auth-token");
        const res = await fetch(
            `http://localhost:5000/api/messages/mySentMessages`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        );
        const data = await res.json();
        if (res.status === 200) {
            setMessages(data);
        }
    };

    const searchUser = (e) => {
        setSearch(e.target.value);
    };

    const getUsers = async () => {
        if (search == null || search.length == 0) {
            // alert('search is null or esmpty');
            setResultToggle(false);
            setSearch(null);
            setUsers([]);
            return;
        }

        const res = await fetch(
            `http://localhost:5000/api/user/search?name=${search}`
        );
        const data = await res.json();
        let userArray = [];
        if (data.length > 0) {
            data.map((user) => {
                userArray = [...userArray, user.username];
            });
        }
        console.log(userArray);
        setUsers(userArray);
        // if (Object.entries(data).length === 0 && data.constructor === Object) {
        //     setResultToggle(false);
        //     return;
        //     //2214: if nothing comes back
        // }

        // setUsers(data);
        console.log(users);
        setResultToggle(true);
    };

    const submitMessage = async () => {
        if (!(selectedUser.length > 0)) {
            setError("Select a friend to send message to...");
            return;
        } else {
            let msg = document.getElementById("msg").value;
            const res = await fetch(
                `http://localhost:5000/api/messages/newMessage`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        to: selectedUser,
                        msg: msg,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("Auth-token"),
                    },
                }
            );
            console.log(res.status);
        }
    };

    return (
        
                    
        <div className="all">
        <Nav />
            <div class="a">
                <b>
                    <h1>Comment to be Written</h1>
                </b>
            </div>
            <div class="b">
                <form class="containers">
                    {error && <h4>{error}</h4>}
                    <label for="rname" className="usr">Reciver's Name :</label>
                    {selectedUser.length > 0 ? (
                        <div
                            onClick={() => {
                                setSelectedUser("");
                            }}
                            className="username"
                        >
                            {selectedUser}
                        </div>
                    ) : (
                        <input
                            type="Name"
                            id="rname"
                            name="name"
                            className="u1"
                            placeholder="Name"
                            required
                            value={search}
                            onChange={searchUser}
                        />
                    )}
                    {/* <input
                        type="Name"
                        id="rname"
                        name="name"
                        placeholder="Name"
                        required
                        onChange={searchUser}
                    /> */}
                    {resultToggle && (
                        <div className="result-container">
                            {users.map((user, id) => (
                                <div
                                    className="result-inner-container"
                                    key={id}
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setResultToggle(false);
                                    }}
                                >
                                    <div className="result-name">{user}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    <br />

                    <label for="message" className="label">Message:</label>
                    <input
                        
                        type="text"
                        id="msg"
                        className="text"
                        name="msg"
                        placeholder="Your msg..."
                        required
                    />
                    <br />
                    <br />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            submitMessage();
                        }}
                        type="submit"
                        class="btn"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            {messages.length > 0 ? (
                <div class="c">
                    {messages.map((msg) => (
                        <div class="comment-sections">
                            <p className="pp">{msg.messageBody}</p>
                            <div class="comment-bodys">
                                <b>Sent to: {msg.toUsername}</b>
                                <small class="text-muteds">
                                    date_posted:{" "}
                                    {new Date(msg.createdAt)
                                        .toString()
                                        .slice(0, 15)}{" "}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
        
    );
}

export default CommentW;
