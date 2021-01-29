import React from 'react';
import './VideoControllBar.css';
import IconButton from './IconButton';
import playIcon from '../assets/play.png';
import ProgressBar from './ProgressBar';

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
                <ProgressBar/>
        </div>
    );

};

export default VideoControllBar;