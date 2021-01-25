import React from 'react';
import './RoundTextField.css'

const RoundTextField = (props) => {
    
    const hasChildren = props.children != null;

    return (
        <div className={"round-tf-container " + props.className}>
            <input className={hasChildren ? "round-tf-input round-tf-margin" : "round-tf-input"} placeholder={props.placeholder}/>
            {props.children}
        </div>
    );
};

export default RoundTextField;