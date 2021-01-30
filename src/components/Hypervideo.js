import React, {useState} from 'react';
import './Hypervideo.css';
import VideoControllBar from './VideoControllBar';
import YouTube from 'react-youtube';
import VideoWrapper from './VideoWrapper';

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

    const [state, setState] = useState({
        player: null
    });
    
    const onReady = (event) => {
        setState((prevState) => {return {...prevState, player: event.target};})
    }

    const onPlay = () => {
        setState((prevState) => {
            prevState.player.playVideo();
            return prevState;
        })
    };
    
    const videoElement = (
        props.isFromYoutube ?
        <YouTube 
            className="video"
            videoId={props.src}
            opts={youtubeOpts} 
            onReady={onReady}
        />
        :
        <VideoWrapper 
            className="video" 
            src={props.src}
            onReady={onReady}
        />        
    );
    
    

    return (
        <div className="hypervideo">
            <div className="hypervideo-content">
                {videoElement}
                <div className="tag-container">
                    
                </div>
            </div>
            <VideoControllBar onPlay={onPlay}/>
        </div>
    );

};

export default Hypervideo;