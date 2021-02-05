import React, {useState} from 'react';
import IconButton from '../../components/icon-button/IconButton';
import './TagLabel.css';
import deleteIcon from '../../assets/delete.png';

const TagLabel = (props) => {

    const [state, setState] = useState({
        isHover: false
    });

    const selectTag = (e) => {
        props.handleSelection(props.id);
    }

    const onMouseHover = () => {
        setState((prevState) => {return {...prevState, isHover: true};});
    };

    const onMouseLeave = () => {
        setState((prevState) => {return {...prevState, isHover: false};});
    };

    const __handleDelete = (e) => {
        props.handleDelete(props.id);
    };

    return (
        <div 
            className={"tag-label-container " + ((!props.otherSelected) || state.isHover ? "tag-selected" : "")}
            onClick={selectTag}
            onMouseEnter={onMouseHover}
            onMouseLeave={onMouseLeave}
        >
            <div className="tag-label-decoration"/>
            <div className="tag-label">{props.name}</div>
            <IconButton
                icon={deleteIcon}
                className={"delete-button" + (!state.isHover ? " delete-button-hide" : "")}
                imgStyle={{
                    width: "10px",
                    height: "10px"
                }}
                handleClick={__handleDelete}
            />
        </div>
    );
};

export default TagLabel;