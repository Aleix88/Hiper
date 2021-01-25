import React, {useState} from 'react';
import './WelcomePage.css';
import DragAndDrop from '../DragAndDrop';
import RoundTextField from '../RoundTextField';
import FileManager from '../../utils/FileManager';
import MainButton from '../MainButton';
import { Redirect } from 'react-router-dom';

const WelcomePage = () => {

    const [needsToRedirect, setRedirect] = useState(false);

    const handleVideoFile = (files) => {
        FileManager.showSaveDialog("Choose your project folder...")
        .then((path) => {
            if (path != null) {

                setRedirect(true);
            } else {
                //TODO: Tractar l'error
            }
        });
    };

    const handleYoutubeURL = () => {
        setRedirect(true);
    };

    const renderRedirect = () => {
        if (needsToRedirect) {
            return <Redirect to="/editor"/>;
        }
    };

    return (
        <div className="welcome-page">
            {renderRedirect()}
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop text="Drag and drop your mp4 file" handleDrop={handleVideoFile}/>
            <p className="welcome-title">choose a video from youtube</p>
            <RoundTextField className="youtube-tf" placeholder="Youtube video ID">
                <MainButton title="DONE" disabled={false} handleClick={handleYoutubeURL}/>
            </RoundTextField>
        </div>
    );

};


export default WelcomePage;