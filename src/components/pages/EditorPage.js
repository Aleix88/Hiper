import React from 'react';
// import { Link } from 'react-router-dom';
import Hypervideo from '../Hypervideo';
import './EditorPage.css';

const EditorPage = () => {

    return (
        <div className="editor-page">
            <div className="tag-inspector app-section">

            </div>
            <div className="editor-main">
                {/* <Link to="/">Home</Link> */}
                <Hypervideo src="2g811Eo7K8U" isFromYoutube={true}></Hypervideo>
            </div>
            <div className="config-inspector app-section">
                Inspector
            </div>
        </div>
    );

};


export default EditorPage;