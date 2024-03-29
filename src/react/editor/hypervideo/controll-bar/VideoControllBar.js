import React, { Component } from 'react';
import './VideoControllBar.css';
import IconButton from '../../../components/icon-button/IconButton';
import playIcon from '../../../../assets/play.png';
import pauseIcon from '../../../../assets/pause.png';
import ProgressBar from './ProgressBar';
import TimeCounter from './TimeCounter';

class VideoControllBar extends Component {
    constructor(props) {
        super(props);
        this.progressBarRef = React.createRef();
    }

    __handlePlay() {
        this.props.onPlay();
    };

    render() {
        return (
            <div className="video-controll-bar">
                <IconButton 
                    icon={this.props.isPlaying ? pauseIcon : playIcon}
                    handleClick={e => this.__handlePlay(e)}
                    imgStyle={{
                        width: "10px",
                        height: "10px"
                    }}
                    isInteractionEnabled={this.props.isInteractionEnabled}
                />
                    <ProgressBar 
                        style={{
                            maxWidth: "80%",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                        ref={this.progressBarRef}
                        maxLength={this.props.duration}
                        currentLength={this.props.currentTime}
                        handleChange={this.props.handleProgressChange}
                        onProgressFixed={this.props.handleProgressFixed}
                        isInteractionEnabled={this.props.isInteractionEnabled}
                    />
                    <TimeCounter
                        currentTime={Math.round(this.props.currentTime)}
                        duration={Math.round(this.props.duration)}
                        style={{
                            display: "inline-block"
                        }}
                    />
            </div>
        );
    }
}

export default VideoControllBar;