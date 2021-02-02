import React from 'react';
import IconButton from './IconButton';
import './TagLabel.css';
import deleteIcon from '../assets/play.png';

const TagLabel = (props) => {
    return (
        <div className="tag-label-container">
            <div className="tag-label-decoration"/>
            <div>{props.name}</div>
            <IconButton
                icon={deleteIcon}
                className="delete-button"
                imgStyle={{
                    width: "10px",
                    height: "10px"
                }}
            />
        </div>
    );
};

export default TagLabel;