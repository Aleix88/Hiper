import React from 'react';
import './Tag.css';

const Tag = (props) => {
    const isVisible = props.currentTime == null || (props.currentTime >= parseInt(props.timestamp)  && props.currentTime <= parseInt(props.timestamp) + parseInt(props.duration));
    return (
        <div 
            className={"tag " + (isVisible ? "" : "tag-hide")}
            style={{
                top: props.y + "%",
                left: props.x + "%"
            }}
        >
            <button className="tag-button" style={{background: props.color}}></button>
            <div className="tag-aspect-ratio"></div>
        </div>
    );

};

export default Tag;