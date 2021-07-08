import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Carousel } from "react-bootstrap";
import "./Slide.css";
import { Link } from "react-router-dom";
import image1 from "../assets/image/one.jpg";
import image2 from "../assets/image/two.jpg";
import image3 from "../assets/image/three.jpg";
import image4 from "../assets/image/four.jpg";
import image5 from "../assets/image/five.jpg";
import image6 from "../assets/image/six.jpg";
import image7 from "../assets/image/seven.jpg";
import image8 from "../assets/image/eight.jpg";

import icon1 from "../assets/icons/user.png";
import icon2 from "../assets/icons/photo.png";
import icon3 from "../assets/icons/comment.png";
import icon4 from "../assets/icons/comment r.png";
import icon5 from "../assets/icons/polling.png";

function Slide() {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("Auth-token")) {
            history.push("/login");
        }
    }, []);
    return (
        <div >
            <Carousel controls={false} fade={true} indicators={false} slide={true}>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image4}
                        alt="fourth slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image5}
                        alt="fifth slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image6}
                        alt="sixth slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image7}
                        alt="seventh slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={image8}
                        alt="eighth slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="Sl">

            <div className="flex" id="flex">
                <div className="box" id="one">
                    <img src={icon1} alt="" />
                    <Link to="/profile" className="a">
                        <h3>Profile</h3>
                    </Link>
                </div>

                <div className="box" id="two">
                    <img src={icon2} alt="" />
                    <Link to="/Photo" className="a">
                        <h3>Photo Upload</h3>
                    </Link>
                </div>

                <div className="box" id="thee">
                    <img src={icon3} alt="" />
                    <Link to="/CommentW" className="a">
                        <h3>
                            Comments to <br></br> be Written
                        </h3>
                    </Link>
                </div>

                <div className="box" id="four">
                    <img src={icon4} alt="" />
                    <Link to="/CommentR" className="a">
                        <h3>
                            Comments <br></br> Received
                        </h3>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Slide;
