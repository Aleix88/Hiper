import React from 'react';
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
            duration: 0, 
            isVideoLoaded: false
        };
        this.controllersRef = React.createRef();
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
        this.__handleProgressFixed = this.__handleProgressFixed.bind(this);
    }

    static PLAYING = 1;
    static PAUSED = 2;

    __onReady = (event) => {
        this.player = event.target;
        const duration = this.player.getDuration();
        this.setState((prevState) => {return {
            ...prevState,
            duration: duration,
            isVideoLoaded: true
        };});
    }

    __timeHandler() {
        const currentTime = this.player.getCurrentTime();
        this.setState((prevState) => {return {...prevState, videoTime: currentTime};});
        this.controllersRef.current.timeUpdated();
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

    __handleProgressFixed(progress) {
        this.player.seekTo(this.state.duration * (progress/100), true);
    }

    __handleProgressChange(progress) {
        this.player.pauseVideo();
        const currentTime = this.state.duration * (progress/100);
        this.setState((prevState) => {return {...prevState, videoTime: currentTime};});
        this.controllersRef.current.timeUpdated();
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
                    ref={this.controllersRef}
                    handleProgressChange={p => this.__handleProgressChange(p)}
                    handleProgressFixed={this.__handleProgressFixed}
                    isInteractionEnabled={this.state.isVideoLoaded}
                />
            </div>
        );    
    }

 }


export default Hypervideo;