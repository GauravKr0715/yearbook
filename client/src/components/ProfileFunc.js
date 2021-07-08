import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import "./ProfileFunc.css";
import { useHistory } from "react-router-dom";

const ProfileFunc = () => {
    const history = useHistory();
    const [userId, setUserId] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const [profileImg, setProfileImg] = useState(
        "https://th.bing.com/th/id/OIP.OesLvyzDO6AvU_hYUAT4IAHaHa?pid=ImgDet&rs=1"
    );
    const [quote, setQuote] = useState("Some Quote...");

    useEffect(() => {
        const token = localStorage.getItem("Auth-token");
        if (token) {
            verifyToken(token);
        } else {
            history.push("/");
        }
    }, []);

    const verifyToken = async (token) => {
        // const res = await fetch(`http://localhost:5000/api/user/verifyToken`, {
        //     method: "POST",
        //     headers: new Headers({
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "application/json",
        //     }),
        // });
        const res = await fetch(`/api/user/verifyToken`, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }),
        });
        if (res.status === 200) {
            const { _id, profilePicURL, quote } = await res.json();
            console.log(_id);
            setUserId(_id);
            setQuote(quote);
            setProfileImg(profilePicURL);
            // history.push("/");
        } else {
            localStorage.removeItem("Auth-token");
            history.push("/");
        }
    };

    const imageHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        const formData = new FormData();
        formData.append("profilePic", file);
        // const res = await fetch(
        //     `http://localhost:5000/api/upload/uploadProfilePic`,
        //     {
        //         method: "POST",
        //         headers: {
        //             Authorization: localStorage.getItem("Auth-token"),
        //             userID: userId,
        //         },
        //         body: formData,
        //     }
        // );
        const res = await fetch(`/api/upload/uploadProfilePic`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("Auth-token"),
                userID: userId,
            },
            body: formData,
        });
        window.location.reload();

        // -----------------------------------------------------
        // const reader= new FileReader()
        // reader.onload=()=>{
        //     if(reader.readyState===2){
        //         setProfileImg(reader.result);
        //     }

        // }
        // reader.readAsDataURL(e.target.files[0])
    };

    const saveQuote = async () => {
        let newQuote = document.getElementById("quote").value;
        // const res = await fetch(`http://localhost:5000/api/user/saveQuote`, {
        //     method: "POST",
        //     headers: {
        //         Authorization: localStorage.getItem("Auth-token"),
        //         "content-type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         quote: newQuote,
        //     }),
        // });
        const res = await fetch(`/api/user/saveQuote`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("Auth-token"),
                "content-type": "application/json",
            },
            body: JSON.stringify({
                quote: newQuote,
            }),
        });
        window.location.reload();
    };

    return (
        <div className="F">
            <Nav />

            <div className="dpic">
                <img
                    src={profileImg}
                    // src={"http://localhost:5000/" + profileImg}
                    id="pro"
                    className="image"
                    accept="image/*"
                />

                <input
                    type="file"
                    className="file"
                    id="input"
                    accept="image/*"
                    onChange={imageHandler}
                />
                <div className="label">
                    <label htmlFor="input" className="upl">
                        Change pic
                    </label>
                </div>

                <div className="Q">
                    {isEditable ? (
                        <>
                            <input
                                id="quote"
                                type="text"
                                placeholder='"Some Quote...."'
                                className="qoute"
                            />
                            <br></br>
                            <button
                                onClick={() => {
                                    // alert(document.getElementById('quote').value);
                                    // setQuote(
                                    //     document.getElementById("quote")
                                    //         .value
                                    // );
                                    saveQuote();
                                    setIsEditable(false);
                                }}
                                className="btnS"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="par">{quote}</p>
                            <button
                                onClick={() => {
                                    setIsEditable(true);
                                }}
                                className="btnE"
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileFunc;
