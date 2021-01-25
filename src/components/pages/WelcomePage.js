import React from 'react';
import './WelcomePage.css';
import DragAndDrop from '../DragAndDrop';
import RoundTextField from '../RoundTextField';
import FileManager from '../../utils/FileManager';
import MainButton from '../MainButton';

const WelcomePage = () => {

    const handleVideoFile = (files) => {
        FileManager.showSaveDialog("Choose your project folder...")
        .then((path) => {
            console.log(path)
        });
    };

    return (
        <div className="welcome-page">
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop text="Drag and drop your mp4 file" handleDrop={handleVideoFile}/>
            <p className="welcome-title">choose a video from youtube</p>
            <RoundTextField className="youtube-tf" placeholder="Youtube video ID">
                <MainButton title="DONE" disabled={false} href=""/>
            </RoundTextField>
        </div>
    );

};


export default WelcomePage;