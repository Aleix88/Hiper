import React from 'react';
import './TagContainer.css';

const TagContainer = (props) => {
    return (
        <div className="tag-container">
            {
                props.children.map(t => {
                    if (React.isValidElement(t)) {
                        return React.cloneElement(t, {currentTime: props.currentTime});
                    }
                    return t;
                })
            }
        </div>
    );
};

export default TagContainer;