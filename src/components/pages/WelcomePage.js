import React from 'react';
import './WelcomePage.css';
import {Link} from 'react-router-dom';
import DragAndDrop from '../DragAndDrop';

const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <h2>Upload your video file</h2>
            <DragAndDrop></DragAndDrop>
            <h2>choose a video from youtube</h2>
            <h2>or <Link>open an existing project</Link></h2>
        </div>
    );

};


export default WelcomePage;