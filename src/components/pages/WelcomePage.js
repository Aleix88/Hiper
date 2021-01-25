import React from 'react';
import './WelcomePage.css';
import DragAndDrop from '../DragAndDrop';
import RoundTextField from '../RoundTextField';
import FileManager from '../../utils/FileManager';

const WelcomePage = () => {

    const handleVideoFile = () => {
        FileManager.showSaveDialog();
    };

    return (
        <div className="welcome-page">
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop text="Drag and drop your mp4 file" handleDrop={handleVideoFile}/>
            <p className="welcome-title">choose a video from youtube</p>
            <RoundTextField placeholder="www.youtube.com/1234"/>
        </div>
    );

};


export default WelcomePage;