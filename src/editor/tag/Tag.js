import React from 'react';
import './Tag.css';

const Tag = (props) => {
    const isVisible = props.currentTime >= props.timestamp  && props.currentTime <= props.timestamp + props.duration;
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