import React from 'react';
import LandingPageVideo from "../assets/img/LandingPageVideo.mp4";

function Preloader() {
    
    return (
        <div className="landing-page-video">
            <video src={LandingPageVideo} autoPlay muted/>
        </div>
    )
}

export default Preloader