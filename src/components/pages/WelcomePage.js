import React, {useState} from 'react';
import './WelcomePage.css';
import DragAndDrop from '../DragAndDrop';
import RoundTextField from '../RoundTextField';
import FileManager from '../../utils/FileManager';
import MainButton from '../MainButton';
import { Redirect } from 'react-router-dom';

const WelcomePage = () => {

    const [state, setState] = useState({
        needsToRedirect: false,
        youtubeError: "",
        fileError: ""
    });

    const setRedirect = (needsToRedirect) => {
        setState(prevState => {
            return {
                ...prevState,
                needsToRedirect: needsToRedirect
            }
        });
    }

    const setYoutubeError = (error) => {
        setState(prevState => {
            return {
                ...prevState,
                youtubeError: error
            }
        });
    }

    const setFileError = (error) => {
        setState(prevState => {
            return {
                ...prevState,
                fileError: error
            }
        });
    }

    const handleVideoFile = (files) => {
        const file = files[0];
        if (FileManager.isVideoFileValid(file.name)) {
            FileManager.showSaveDialog("Choose your project folder...")
            .then(([path, canceled]) => {
                if (canceled) return;
                if (path != null && path.length > 0) {
                    setRedirect(true);
                } else {
                    setFileError("Error creating the project. Please notify the problem to the developer.")
                }
            });
        } else {
            setFileError("File error: make sure that the video format is MP4.")
        }
    };

    const handleYoutubeURL = () => {
        setRedirect(true);
    };

    const renderRedirect = () => {
        if (state.needsToRedirect) {
            return <Redirect to="/editor"/>;
        }
    };

    return (
        <div className="welcome-page">
            {renderRedirect()}
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop text="Drag and drop your mp4 file" handleDrop={handleVideoFile}/>
            <p className="error-text">{state.fileError}</p>
            <p className="welcome-title">choose a video from youtube</p>
            <RoundTextField className="youtube-tf" placeholder="Youtube video ID">
                <MainButton title="DONE" disabled={false} handleClick={handleYoutubeURL}/>
            </RoundTextField>
            <p className="error-text">{state.youtubeError}</p>
        </div>
    );

};


export default WelcomePage;