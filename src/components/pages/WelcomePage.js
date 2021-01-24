import React from 'react';
import './WelcomePage.css';
import {Link} from 'react-router-dom';
import DragAndDrop from '../DragAndDrop';

const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop></DragAndDrop>
            <p className="welcome-title">choose a video from youtube</p>
            <p className="welcome-title">or <Link>open an existing project</Link></p>
        </div>
    );

};


export default WelcomePage;