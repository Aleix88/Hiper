import React from 'react';
import MainButton from '../main-button/MainButton';
import './Alert.css';

const Alert = (props) => {

    return (
        <div className="alert-background">
            <div className="alert-container">
                <h2 className="alert-title">{props.title}</h2>
                <p className="alert-description">{props.description}</p>
                <MainButton 
                    title={props.buttonText}
                    handleClick={props.handleClick}
                ></MainButton>
            </div>
        </div>
    );

};

export default Alert;