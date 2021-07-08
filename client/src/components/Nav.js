import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import { Navbar } from "react-bootstrap";
// import verifyToken from '../../../verifyToken';

function Nav() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("Auth-token");
        if (token) {
            verifyUserToken(token);
        }
    }, []);

    const verifyUserToken = async (token) => {
        // const res = await fetch(`http://localhost:5000/api/verifyUser`, {
        //     method: "GET",
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: token,
        //     },
        // });
        const res = await fetch(`/api/verifyUser`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: token,
            },
        });
        const data = res.json();
        if (res.status === 200) {
            setIsLoggedIn(true);
            setUsername(data.username);
        }
    };

    return (
        <div>
            <Navbar variant="dark" className="nav" sticky="top">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="log">
                        <div
                            onClick={() => {
                                localStorage.removeItem("Auth-token");
                                history.push("/");
                            }}
                        >
                            LogOut ?
                        </div>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Nav;
