import React, { Component } from 'react';
import './TagContainer.css';

const TagEditor = (props) => {
    return (
        <div className="tag-container">
            {
                props.children.map(t => {
                    if (React.isValidElement(t)) {
                        return React.cloneElement(t, {currentTime: props.currentTime});
                    }
                    return t;
                })
            }
        </div>
    );
};

export default TagEditor;