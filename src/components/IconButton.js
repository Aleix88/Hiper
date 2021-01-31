import React from 'react';
import './IconButton.css';

const IconButton = (props) => {
    return (
        <div 
            className={props.isInteractionEnabled ? "button-icon-container" : "button-icon-container button-icon-disabled"}
            onClick={props.handleClick}
        >
            <img style={props.imgStyle} src={props.icon} alt="Icon" className="button-icon"/>
        </div>
    );
};

export default IconButton;