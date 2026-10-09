import React from "react";
import { FaGoogle, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

function SocialButtons() {
    return (
        <div className="social-container">
            <button className="social-btn google">
                <FaGoogle />
                Google Login
            </button>
            <button className="social-btn-github">
                <FaGithub />
                Github Login
            </button>
            <button className="social-btn facebook">
                <FaFacebook />
                Facebook Login
            </button>
            <button className="social-btn linkedin">
                <FaLinkedin />
                LinkedIn Login
            </button>
            </div>
    );
}


export default SocialButtons;