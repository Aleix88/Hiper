import React, {useState} from 'react';
import './Hypervideo.css';
import VideoControllBar from './VideoControllBar';
import YouTube from 'react-youtube';
import VideoWrapper from './VideoWrapper';

class Hypervideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player: null,
            isPlaying: false
        };
    }

    static PLAYING = 1;
    static PAUSED = 2;

    __onReady = (event) => {
        console.log(this)
        this.setState((prevState) => {return {...prevState, player: event.target};});
    }

    isPlaying = () => {
        return this.state.player.getPlayerState() === Hypervideo.PLAYING;
    };

    __onPlay = () => {
        if (this.isPlaying()) {
            this.state.player.pauseVideo();
        } else {
            this.state.player.playVideo();
        }
    };

    __onStateChange(event) {
        console.log(this);
        const state = event.data;
        if(state === Hypervideo.PLAYING) {
            this.setState((prevState) => {return {...prevState, isPlaying: true};});
        } else if (state === Hypervideo.PAUSED) {
            this.setState((prevState) => {return {...prevState, isPlaying: false};});
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
                />
            </div>
        );    
    }

 }


export default Hypervideo;