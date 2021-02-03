import React from 'react';
import './IconButton.css';

const IconButton = (props) => {
    const isEnabled = props.isInteractionEnabled == null || props.isInteractionEnabled === true;
    return (
        <div 
            className={isEnabled ? "button-icon-container " + props.className : "button-icon-container button-icon-disabled " + props.className}
            onClick={props.handleClick}
        >
            <img style={props.imgStyle} src={props.icon} alt="Icon" className="button-icon"/>
        </div>
    );
};

export default IconButton;