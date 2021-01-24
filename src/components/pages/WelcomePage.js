import React from 'react';
import './WelcomePage.css';
import {Link} from 'react-router-dom';
import DragAndDrop from '../DragAndDrop';
import RoundTextField from '../RoundTextField';

const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <p className="welcome-title">Upload your video file</p>
            <DragAndDrop></DragAndDrop>
            <p className="welcome-title">choose a video from youtube</p>
            <RoundTextField placeholder="www.youtube.com/1234"/>
            <p className="welcome-title">or <Link>open an existing project</Link></p>
            <input type="file"></input>
        </div>
    );

};


export default WelcomePage;