import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { FaGoogle, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

function SocialButtons() {

    const handleGoogleSuccess = async(credentialResponse) => {
       try{
          const res = await axios.post("http://localhost:8080/api/auth/google",{
            token:credentialResponse.credential
          });
          localStorage.setItem("token",res.data.token);
          alert("Login Successful");
          window.location.href="/dashboard";
       } catch(error) {
        console.log(error);
        alert("Login Failed");
       }
    }
    return (
        <div className="social-container">

            <div className="social-btn google">
                <div>
                    <GoogleLogin 
                    onSuccess={handleGoogleSuccess}
                    onError={() => alert("Login Failed")}
                    />
                </div>
            </div>
            {/* <button className="social-btn google">
                <FaGoogle />
                Google Login
            </button> */}
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
};

export default SocialButtons;