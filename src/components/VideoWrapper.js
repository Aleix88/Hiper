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

    onLoadedData(e) {
        e.target = this;
        this.props.onReady(e);
    }
    
    getPlayerState() {
        return this.videoRef.current.paused ? Hypervideo.PAUSED : Hypervideo.PLAYING;
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
                onLoadedData={e => this.onLoadedData(e)}
                ref={this.videoRef}
                onPause={e => this.__onStateChange(e, Hypervideo.PAUSED)}
                onPlay={e => this.__onStateChange(e, Hypervideo.PLAYING)}
            />
        );   
    }

}

export default VideoWrapper;