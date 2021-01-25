import React from 'react'
import {Link} from 'react-router-dom';
import './MainButton.css';

const MainButton = (props) => {

    if (props.href != null) {
        return (
            <Link
                className={props.disabled ? "main-button-link main-button-disabled" : "main-button-link"}
                to={props.href}
            >
                {props.title}
            </Link>
        );
    } else {
        return (
            <button 
                className={props.disabled ? "main-button main-button-disabled" : "main-button"}
                onClick={props.handleClick}
            >
                {props.title}
            </button>
        );
    }

};

export default MainButton;