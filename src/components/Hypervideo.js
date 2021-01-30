import React from 'react';
import './Hypervideo.css';
import VideoControllBar from './VideoControllBar';
import YouTube from 'react-youtube';

const Hypervideo = (props) => {

    const youtubeOpts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0, 
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            autohide:1,
            wmode:'opaque',
            start: 0
        }
    };

    const videoElement = (
        props.isFromYoutube ?
        <YouTube 
        className="video"
        videoId={props.src}
        opts={youtubeOpts} 
        />
        :
        <video className="video" src={props.src}/>        
    );

    return (
        <div className="hypervideo">
            <div className="hypervideo-content">
                {videoElement}
                <div className="tag-container">
                    Eiii
                </div>
            </div>
            <VideoControllBar/>
        </div>
    );

};

export default Hypervideo;