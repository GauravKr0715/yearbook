import React from 'react'
import "./link.css"
import {link} from "react-router-dom"

import icon1 from "../assets/icons/user.png"
import icon2 from "../assets/icons/photo.png"
import icon3 from "../assets/icons/comment.png"
import icon4 from "../assets/icons/comment r.png"
import icon5 from "../assets/icons/polling.png"


function links() {
    return (
        <div>
        <div className="flex" id="flex">
        <link to="/">
        <div className="box" id="one">
            <img src={icon1} alt="" />
            <h3>Profile</h3>
                      

        </div>
        </link>

        <link to="/">
        <div className="box" id="two">
            <img src={icon2} alt=""/>
            <h3>Photo Upload</h3>
        </div>
        </link>

        <link to="/">
        <div className="box" id="thee">
            <img src={icon3} alt=""/>
            <h3>Comments to be Written</h3>          
            
        </div>
        </link>

        <link to="/">
        <div className="box" id="four">
            <img src={icon4} alt=""/>
            <h3>Comments Received</h3>
        </div>
        </link>

        <link to="/">
        <div className="box" id="five">
            <img src={icon5} alt=""/>
            <h3>Polling</h3>           

        </div>
        </link>
    

</div>
        </div>
    )
}

export default links
