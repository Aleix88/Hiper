import React, {useRef} from 'react';
import './SettingTextfield.css';

const SettingTextfield = (props) => {

    const inputRef = useRef();

    const onBlur = () => {
        inputRef.current.className = "stf-input";
        props.onEditFinish();
    };
    
    const onFocus = () => {
        inputRef.current.className = "stf-input stf-input-focus";
    }

    const checkEnterPressed = (e) => {
        if (e.key === "Enter") {
            inputRef.current.blur();
        }
    };

    return (
        <div className="stf-container">
            <p className="stf-label">{props.title}</p>
            <input 
                ref={inputRef}
                className ="stf-input" 
                type="text" 
                placeholder={props.placeholder}
                value={props.value} 
                onChange={props.handleChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyPress={checkEnterPressed}
            />
        </div>
    );
}

export default SettingTextfield;