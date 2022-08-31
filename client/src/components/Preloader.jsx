import React from 'react';
import LandingPageVideo from "../assets/LandingPageVideo.mp4";

function Preloader() {
    
    return (
        <div id="landing-page-video">
            <video src={LandingPageVideo} autoPlay muted/>
        </div>
    )
}

export default Preloader