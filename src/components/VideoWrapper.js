import React from 'react';
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

    render() {
        return (
            <video 
                src={this.props.src} 
                className={this.props.className} 
                onLoadedData={e => this.onLoadedData(e)}
                ref={this.videoRef}
            />
        );   
    }

}

export default VideoWrapper;