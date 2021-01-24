import React from 'react';
import './DragAndDrop.css';

const DragAndDrop = () => {

    const handleDrop = (e) => {
    };

    const handleDragOver = (e) => {
    };

    const handleDragEnter = (e) => {
        console.log(e);
    };

    const handleDragLeave = (e) => {
    };

    return (
        <div className="container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <div className="icon-container"></div>
            <h2 className="description-title">Drag and drop your video here</h2>
        </div>
    );
};

export default DragAndDrop;