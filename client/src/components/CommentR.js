import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";

import "./commentR.css";
function CommentR() {
    const history = useHistory();
    const [loading, setLoading] = useState();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("Auth-token")) {
            history.push("/login");
        } else {
            getMyMessages();
        }
    }, []);

    const getMyMessages = async () => {
        const token = localStorage.getItem("Auth-token");
        // const res = await fetch(
        //     `http://localhost:5000/api/messages/myMessages`,
        //     {
        //         method: "GET",
        //         headers: {
        //             Authorization: token,
        //         },
        //     }
        // );
        const res = await fetch(`/api/messages/myMessages`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            setMessages(data);
        }
    };
    return (
        <div>
            <Nav />
            <section>
                <div class="container">
                    <h2>Comments received</h2>
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div class="comment-section">
                                <p>{msg.messageBody}</p>
                                <div class="comment-body">
                                    <b>Sent by: {msg.fromUsername}</b>
                                    <small class="text-muted">
                                        date_posted:{" "}
                                        {new Date(msg.createdAt)
                                            .toString()
                                            .slice(0, 15)}{" "}
                                    </small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div class="comment-section">
                            <p>No Comments Here... Go make some friends</p>
                        </div>
                    )}
                    {/* <div class="comment-section">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                        </p>
                        <div class="comment-body">
                            <b>sent by</b>
                            <small class="text-muted">date_posted </small>
                        </div>
                    </div>
                    <div class="comment-section">
                        <p>comment</p>
                        <div class="comment-body">
                            <b>sent by</b>
                            <small class="text-muted">date_posted </small>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    );
}

export default CommentR;
