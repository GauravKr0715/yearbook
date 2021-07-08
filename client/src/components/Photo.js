import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useHistory } from "react-router-dom";

import "./Photo.css";
function Photo() {
    const history = useHistory();
    const [userId, setUserId] = useState("");
    const [profileImg, setProfileImg] = useState(
        "https://jpublicrelations.com/wp-content/uploads/2015/12/placeholder-1.png.1236x617_default.png"
    );

    useEffect(() => {
        const token = localStorage.getItem("Auth-token");
        if (token) {
            verifyToken(token);
        } else {
            history.push("/");
        }
    }, []);

    const verifyToken = async (token) => {
        const res = await fetch(`http://localhost:5000/api/user/verifyToken`, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }),
        });
        if (res.status === 200) {
            const { _id, groupPicURL } = await res.json();
            console.log(_id);
            setUserId(_id);
            setProfileImg(groupPicURL);
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
        formData.append("groupPic", file);
        const res = await fetch(
            `http://localhost:5000/api/upload/uploadGroupPic`,
            {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("Auth-token"),
                    userID: userId,
                },
                body: formData,
            }
        );
        window.location.reload();

        // -----------------------------------------------------
        // const reader = new FileReader();
        // reader.onload = () => {
        //     if (reader.readyState === 2) {
        //         setProfileImg(reader.result);
        //     }
        // };
        // reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div className="P">
            <Nav />

            
                <div className="dp">
                    <img
                        src={"http://localhost:5000/" + profileImg}
                        id="pro"
                        className="img"
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
                            Upload Pic
                        </label>
                    </div>

                    <div className="p">
                        <p>
                            "All kinds of first time in life are sometimes
                            experience with college friends.So let's make it
                            more memorable by uploading your Group Photo or
                            Collage.. "
                        </p>
                    </div>
                </div>
            </div>
        
    );
}

export default Photo;
