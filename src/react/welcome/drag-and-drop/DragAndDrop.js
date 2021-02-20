import React, { useState } from 'react';
import './DragAndDrop.css';
import folderIcon from '../../../assets/folder.png';

const DragAndDrop = (props) => {

    const [isDragging, setIsDragging] = useState(false);

    const hasFilesDragged = (e) => e.dataTransfer.items && e.dataTransfer.items.length > 0;

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(() => false);
        if (hasFilesDragged(e)) {
            props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasFilesDragged(e)) {
            setIsDragging(() => true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(() => false);
    };

    return (
        <div className={isDragging ? "drag-container drag-container-focus" : "drag-container"}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <div className="drag-icon-container">
                <img className={isDragging ? "drag-icon drag-icon-scale" : "drag-icon"}
                 src={folderIcon} alt="Folder icon"/>
            </div>
            <h2 className={isDragging ? "drag-title drag-title-disappear" : "drag-title"}>{props.text}</h2>
        </div>
    );
};

export default DragAndDrop;