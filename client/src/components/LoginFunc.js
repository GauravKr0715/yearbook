import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./LoginFun.css";

const Login = () => {
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async ({ email, password }) => {
        setLoading(true);
        setError(null);
        // alert(email);
        // alert(password);
        // const response = await fetch("http://localhost:5000/api/user/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //     }),
        // });
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        setLoading(false);
        if (response.status === 200) {
            localStorage.setItem("Auth-token", data.token);
            history.push("/");
        } else {
            setError(data.message);
        }
        // console.log(response.status);
        // console.log(data);
    };

    // const userLogin = async () => {
    //     alert("we here?");
    //     const username = document.getElementById("username").value;
    //     alert(username);
    //     const password = document.getElementById("password").value;
    //     alert(password);
    //     const res = await fetch(`http://localhost:5000/api/user/login`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             email: username,
    //             password: password,
    //         }),
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // };

    return (
        <div className="bag">
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className="entry-page">
                    <div className="field">
                        {/* <form> */}
                        <h1>
                            Log In <i class="fas fa-sign-in-alt"></i>
                        </h1>
                        {error && <h4>{error}</h4>}
                        <ul>
                            <li>
                                <label for="username">Username:</label>
                                <br></br>
                                <input
                                    type="email"
                                    name="email"
                                    id="username"
                                    required
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                            </li>
                            <li>
                                <label for="password">Password:</label>
                                <br></br>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </li>
                        </ul>
                    </div>
                    <button
                        type="submit"
                        // onClick={() => {
                        //     userLogin();
                        // }}
                    >
                        {loading ? "Loading... 😃" : "Login 😉"}
                    </button>
                </section>
            </form>
        </div>
    );
};

export default Login;
