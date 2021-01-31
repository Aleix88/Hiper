import React, {useState} from 'react';
import './Hypervideo.css';
import VideoControllBar from './VideoControllBar';
import YouTube from 'react-youtube';
import VideoWrapper from './VideoWrapper';
import VideoTimer from '../utils/VideoTimer';

class Hypervideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player: null,
            isPlaying: false,
            videoTime: 0,
            duration: 0
        };
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
    }

    static PLAYING = 1;
    static PAUSED = 2;

    __onReady = (event) => {
        this.player = event.target;
        const duration = this.player.getDuration();
        console.log(duration)
        this.setState((prevState) => {return {...prevState, duration: duration};});
    }

    __timeHandler() {
        const currentTime = this.player.getCurrentTime();
        this.setState((prevState) => {return {...prevState, videoTime: currentTime};});
    }

    isPlaying = () => {
        return this.player.getPlayerState() === Hypervideo.PLAYING;
    };

    __onPlay = () => {
        if (this.isPlaying()) {
            this.player.pauseVideo();
        } else {
            this.player.playVideo();
        }
    };

    __onStateChange(event) {
        const state = event.data;
        if(state === Hypervideo.PLAYING) {
            this.setState((prevState) => {return {...prevState, isPlaying: true};});
            this.videoTimer.play();
        } else if (state === Hypervideo.PAUSED) {
            this.setState((prevState) => {return {...prevState, isPlaying: false};});
            this.videoTimer.pause();
        }
    }

    render() {
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
            this.props.isFromYoutube ?
            <YouTube 
                className="video"
                videoId={this.props.src}
                opts={youtubeOpts} 
                onReady={e => this.__onReady(e)}
                onStateChange={e => this.__onStateChange(e)}
            />
            :
            <VideoWrapper 
                className="video" 
                src={this.props.src}
                onReady={e => this.__onReady(e)}
                onStateChange={e => this.__onStateChange(e)}
            />        
        );

        return (
            <div className="hypervideo">
                <div className="hypervideo-content">
                    {videoElement}
                    <div className="tag-container">
                        
                    </div>
                </div>
                <VideoControllBar 
                    onPlay={this.__onPlay}
                    isPlaying={this.state.isPlaying}
                    currentTime={this.state.videoTime}
                    duration={this.state.duration}
                />
            </div>
        );    
    }

 }


export default Hypervideo;