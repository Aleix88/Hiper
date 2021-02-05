import React from 'react';
import './IconButton.css';

const IconButton = (props) => {
    const isEnabled = props.isInteractionEnabled == null || props.isInteractionEnabled === true;
    const handleClick = (e) => {
        e.stopPropagation();
        props.handleClick(e);
    };
    return (
        <div 
            className={isEnabled ? "button-icon-container " + props.className : "button-icon-container button-icon-disabled " + props.className}
            onClick={handleClick}
        >
            <img style={props.imgStyle} src={props.icon} alt="Icon" className="button-icon"/>
        </div>
    );
};

export default IconButton;