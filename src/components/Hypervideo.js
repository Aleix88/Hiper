import React from 'react';
import './Hypervideo.css';
import VideoControllBar from './VideoControllBar';
import videoTest from '../assets/video.mp4';

const Hypervideo = () => {

    return (
        <div className="hypervideo">
            <div className="hypervideo-content">
                <video src={videoTest}/>
                <div className="tag-container">
                    Eiii
                </div>
            </div>
            <VideoControllBar/>
        </div>
    );

};

export default Hypervideo;