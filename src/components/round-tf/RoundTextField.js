import React, {useState} from 'react';
import './RoundTextField.css'

const RoundTextField = (props) => {
    
    const hasChildren = props.children != null;
    const [value, setValue] = useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
        props.handleChange(event.target.value);
    };

    return (
        <div className={"round-tf-container " + props.className}>
            <input 
                className={hasChildren ? "round-tf-input round-tf-margin" : "round-tf-input"} 
                placeholder={props.placeholder}
                value={value}
                onChange={handleChange}
            />
            {props.children}
        </div>
    );
};

export default RoundTextField;