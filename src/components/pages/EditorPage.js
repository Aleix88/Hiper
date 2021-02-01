import React from 'react';
import { Link } from 'react-router-dom';
import Hypervideo from '../Hypervideo';
import './EditorPage.css';
import videoTest from '../../assets/video.mp4';

const EditorPage = (props) => {
    return (
        <div className="editor-page">
            <div className="tag-inspector app-section">

            </div>
            <div className="editor-main">
                <Link to="/">Home</Link>
                <Hypervideo src={props.src} isFromYoutube={props.isFromYoutube}></Hypervideo>
            </div>
            <div className="config-inspector app-section">
                Inspector
            </div>
        </div>
    );

};


export default EditorPage;