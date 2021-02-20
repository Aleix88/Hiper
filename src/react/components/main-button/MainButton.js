import React from 'react'
import {Link} from 'react-router-dom';
import './MainButton.css';

const MAIN = "MAIN";
const SECONDARY = "SECONDARY";

export {
    MAIN,
    SECONDARY
}

const MainButton = (props) => {


    const getType = () => {
        switch (props.type) {
            case SECONDARY:
                return "secondary-button";
            case MAIN:
            default:
                return "";
        }
    };

    let className = "main-button";
    className += props.disabled ? "main-button-disabled" : "";
    className += " " + getType();

    if (props.href != null) {

        return (
            <Link
                className={className}
                to={props.href}
                style={props.style}
            >
                {props.title}
            </Link>
        );
    } else {
        let className = "main-button";
        className += props.disabled ? "main-button-disabled" : "";
        className += " " + getType();
        return (
            <button 
                className={className}
                onClick={props.handleClick}
                style={props.style}
            >
                {props.title}
            </button>
        );
    }

};

export default MainButton;