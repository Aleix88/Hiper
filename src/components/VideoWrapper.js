import React from 'react';
import Hypervideo from './Hypervideo';
import './VideoWrapper.css';


class VideoWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    playVideo() {
        this.videoRef.current.play();
    }

    pauseVideo() {
        this.videoRef.current.pause();
    }

    seekTo(time) {
        this.videoRef.current.currentTime = time;
    }

    onLoadedData(e) {
        e.target = this;
        this.props.onReady(e);
    }
    
    getPlayerState() {
        return this.videoRef.current.paused ? Hypervideo.PAUSED : Hypervideo.PLAYING;
    }

    getCurrentTime() {
        return this.videoRef.current.currentTime;
    }

    getDuration() {
        return this.videoRef.current.duration;
    }

    __onStateChange(e, state) {
        e.data = state;
        this.props.onStateChange(e);
    }

    render() {

        return (
            <video 
                src={this.props.src} 
                className={this.props.className} 
                ref={this.videoRef}
                onLoadedData={e => this.onLoadedData(e)}
                onPause={e => this.__onStateChange(e, Hypervideo.PAUSED)}
                onPlay={e => this.__onStateChange(e, Hypervideo.PLAYING)}
            />
        );   
    }

}

export default VideoWrapper;