import React from 'react';
import './Hypervideo.css';
import VideoControllBar from './controll-bar/VideoControllBar';
import YouTube from 'react-youtube';
import VideoWrapper from './video-wrapper/VideoWrapper';
import VideoTimer from '../../utils/VideoTimer';
import TagContainer from './tag-container/TagContainer';

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
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
        this.__handleProgressFixed = this.__handleProgressFixed.bind(this);
        this.seekTo = this.seekTo.bind(this);
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
    }

    isPlaying = () => {
        return this.player.getPlayerState() === Hypervideo.PLAYING;
    };

    getCurrentTime() {
        return this.state.videoTime;
    }

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

    seekTo(seconds) {
        this.player.seekTo(seconds, true);
        this.setState((prevState) => {return {...prevState, videoTime: seconds};});
    }

    __handleProgressChange(progress) {
        this.player.pauseVideo();
        const currentTime = this.state.duration * (progress/100);
        this.setState((prevState) => {return {...prevState, videoTime: currentTime};});
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
                videoId={this.props.media}
                opts={youtubeOpts} 
                onReady={e => this.__onReady(e)}
                onStateChange={e => this.__onStateChange(e)}
            />
            :
            <VideoWrapper 
                className="video" 
                src={this.props.media.url}
                onReady={e => this.__onReady(e)}
                onStateChange={e => this.__onStateChange(e)}
            />        
        );

        return (
            <div className="hypervideo">
                <div className="hypervideo-content">
                    {videoElement}
                    <TagContainer currentTime={this.state.videoTime}>
                        {this.props.children}
                    </TagContainer>
                </div>
                <VideoControllBar 
                    onPlay={this.__onPlay}
                    isPlaying={this.state.isPlaying}
                    currentTime={this.state.videoTime}
                    duration={this.state.duration}
                    handleProgressChange={p => this.__handleProgressChange(p)}
                    handleProgressFixed={this.__handleProgressFixed}
                    isInteractionEnabled={this.state.isVideoLoaded}
                />
            </div>
        );    
    }

 }


export default Hypervideo;