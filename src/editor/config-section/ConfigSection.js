import React from 'react';
import './ConfigSection.css';

const ConfigSection = (props) => {

    return (
        <div 
            className="config-section"
            style= {{
                maxHeight: props.maxHeight,
                height: props.height
            }}
        >
            {props.title ? <h3 className="config-section-title">{props.title}</h3> : null}
            <div className="config-scroll">
                {props.children}
            </div>
        </div>
    );

};

export default ConfigSection;