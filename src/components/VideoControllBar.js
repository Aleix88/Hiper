import React from 'react';
import './VideoControllBar.css';
import IconButton from './IconButton';
import playIcon from '../assets/play.png';
import ProgressBar from './ProgressBar';
import TimeCounter from './TimeCounter';

const VideoControllBar = (props) => {

    const handlePlay = () => {
        props.playClicked();
    };

    return (
        <div className="video-controll-bar">
            <IconButton 
                icon={playIcon}
                handleClick={handlePlay}
                imgStyle={{
                    width: "10px",
                    height: "10px"
                }}
                />
                <ProgressBar 
                    style={{
                        width: "80%",
                        marginLeft: "10px",
                        marginRight: "10px"
                    }}
                />
                <TimeCounter
                    currentTime={100}
                    duration={1200}
                    style={{
                        display: "inline-block"
                    }}
                />
        </div>
    );

};

export default VideoControllBar;