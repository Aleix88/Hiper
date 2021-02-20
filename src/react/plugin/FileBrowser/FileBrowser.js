import React from 'react';
import './FileBrowser.css';

const FileBrowser = (props) => {

    let content = props.textContent ? props.textContent : "Select yout plugin file";
    content = props.error ? "Error: not compatible file." : content;

    return (
        <div className="file-browser">
            <div className={"file-browser-text" + (props.error ? " file-browser-text-error" : "")}>{content}</div>
            <button className="browse-button" onClick={props.onBrowse}>Browse</button>
        </div>
    );

};

export default FileBrowser;