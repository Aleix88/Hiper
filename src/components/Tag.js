import React from 'react';
import './Tag.css';

const Tag = (props) => {

    return (
        <div 
            className="tag"
            style={{
                top: props.y + "%",
                left: props.x + "%"
            }}
        >
            <button className="tag-button"></button>
            <div className="tag-aspect-ratio"></div>
        </div>
    );

};

export default Tag;