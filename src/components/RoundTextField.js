import React from 'react';
import './RoundTextField.css'

const RoundTextField = (props) => {
    return (
        <div className="round-tf-container">
            <input className="round-tf-input" placeholder={props.placeholder}/>
        </div>
    );
};

export default RoundTextField;