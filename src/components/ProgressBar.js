import React, {useState} from 'react';
import './ProgressBar.css';

const ProgressBar = () => {

    const [state, setState] = useState({
        dragStart: false
    });

    const onMouseDown = (event) => {
        console.log("down")
        setState((prevState) => {return {...prevState, dragStart: true}});
    };

    const onMouseUp = (event) => {
        console.log("Up")
        setState((prevState) => {return {...prevState, dragStart: false}});
    }

    const onMouseMove = (event) => {
        if (!state.dragStart) {return;}
        console.log("Move")
    }

    return (
        <div className="progress-bar-container" 
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <div className="progress-bar">
                <div className="progress-bar-current"/>
            </div>
            <div className="progress-cursor"/>
        </div>
    );

};

export default ProgressBar;