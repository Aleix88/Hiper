import React from 'react'
import {Link} from 'react-router-dom';
import './MainButton.css';

const MainButton = (props) => {

    if (props.href != null) {
        return (
            <Link
                className={props.disabled ? "main-button-link main-button-disabled" : "main-button-link"}
                to={props.href}
                style={props.style}
            >
                {props.title}
            </Link>
        );
    } else {
        return (
            <button 
                className={props.disabled ? "main-button main-button-disabled" : "main-button"}
                onClick={props.handleClick}
                style={props.style}
            >
                {props.title}
            </button>
        );
    }

};

export default MainButton;