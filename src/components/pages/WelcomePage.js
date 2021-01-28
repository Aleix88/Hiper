import React, {useState} from 'react';
import './WelcomePage.css';
import DragAndDrop from '../DragAndDrop';
import RoundTextField from '../RoundTextField';
import FileManager from '../../utils/FileManager';
import MainButton from '../MainButton';
import { Redirect } from 'react-router-dom';

const validVideoExtensions = ['mp4'];
const validImageExtensions = ['jpg', 'png'];

const WelcomePage = () => {

    const [state, setState] = useState({
        needsToRedirect: false,
        youtubeError: "",
        fileError: "",
        youtubeURL: ""
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

    const createProject = (file) => {
        FileManager.showSaveDialog("Create your project folder...", "Project name:", "Create", "documents")
        .then((destPath) => {
            return FileManager.createFolder(destPath);
        })
        .then((destPath) => {
            if (file == null) {
                return Promise.resolve();
            }
            return FileManager.saveFile(file.path, destPath + "/" + file.name);
        })
        .then(() => {
            setRedirect(true);
        })
        .catch(()=>{
            setFileError("Error saving the file. Try with another project folder name.");
        });
    };

    const handleVideoFile = (files) => {
        const file = files[0];
        const extension = FileManager.getFileExtension(file.name);
        if (validVideoExtensions.includes(extension) || validImageExtensions.includes(extension)) {
            createProject(file, false);
        } else {
            setFileError("File error: make sure that the video format is MP4.")
        }
    };

    const handleYoutubeURL = () => {
        if (FileManager.isYoutubeURLValid(state.youtubeURL)) {
            setRedirect(true);
        } else {
            setYoutubeError("Please enter a youtube ID");
        }
    };

    const renderRedirect = () => {
        if (state.needsToRedirect) {
            return <Redirect to="/editor"/>;
        }
    };

    const handleTFChange = (value) => {
        setState((prevState) => {
            return {
                ...prevState,
                youtubeURL: value
            };
        });
    };

    return (
        <div className="welcome-page">
            {renderRedirect()}
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop text="Drag and drop your mp4 file" handleDrop={handleVideoFile}/>
            <p className="error-text">{state.fileError}</p>
            <p className="welcome-title">choose a video from youtube</p>
            <RoundTextField className="youtube-tf" placeholder="Youtube video ID" handleChange={handleTFChange}>
                <MainButton title="DONE" disabled={false} handleClick={handleYoutubeURL}/>
            </RoundTextField>
            <p className="error-text">{state.youtubeError}</p>
        </div>
    );

};


export default WelcomePage;