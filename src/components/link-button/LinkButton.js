import React from 'react';
import './LinkButton.css';

const LinkButton = (props) => {

    return (
        <button className={"link-button " + props.className} onClick={props.onClick}>{props.title}</button>
    );

};

export default LinkButton;