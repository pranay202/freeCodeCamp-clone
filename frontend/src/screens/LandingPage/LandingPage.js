import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {BsSpotify, BsApple, BsMicrosoft} from "react-icons/bs"
import {FaAmazon} from "react-icons/fa"
import "./LandingStyles.css";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/courses");
    }
  }, [history, userInfo]);

  return (
      <div className="layout">
    <div className="main">

          <div className="intro-text text-center">
            <div className="leading-loose ">
            <div className="text-left">
              <h1 className="title my-4">Learn to code - for free.</h1>
              <h1 className="title my-4">Build projects.</h1>
              <h1 className="title my-4">Earn certifications.</h1>
              <p className="subtitle">Since 2014,more than 40,000 freeCodeCamp.org graduates have gotten jobs at tech companies including:</p>
            </div>
              <div className="icons">
                <div><i><BsApple /></i></div>
                <div><i> <strong>Google</strong> </i></div>
                <div><i> <BsMicrosoft/> </i> <strong>Microsoft</strong></div>
                <div><i> <BsSpotify/> </i> <strong>Spotify</strong></div>
                <div><i> <FaAmazon/> </i> <strong>amazon</strong>.com</div>
              </div>
            </div>
            
              <Link to="/login" className="landingbutton">
                <button size="lg" className="btn">
                  Get started (it's free)
                </button>
              </Link>
          </div>

      </div>
    </div>
  );
}

export default LandingPage;
