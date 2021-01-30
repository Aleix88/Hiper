import React, {useState, useEffect, useRef} from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {

    const containerRef = useRef(null);

    const [state, setState] = useState({
        dragStart: false,
        progress: 0
    });

    const onMouseDown = (event) => {
        setState((prevState) => {return {...prevState, dragStart: true}});
    };

    const onMouseUp = (event) => {
        setState((prevState) => {return {...prevState, dragStart: false}});
    };

    const onClick = (event) => {
        calculateBarPosition(event.clientX);
    }

    const onMouseMove = (event) => {
        setState((prevState) => {
            if (prevState.dragStart) {
                calculateBarPosition(event.clientX);
            }
            return prevState;
        });
    };

    const calculateBarPosition = (clientX) => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const currentX = clientX - containerRect.x;
        let progress = currentX / containerRect.width;
        progress = progress < 0 ? 0 : progress;
        progress = progress > 1 ? 1: progress;
        progress = Math.floor(progress * 100);
        setState((prevState) => {return {...prevState, progress: progress}})
    };

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div className="progress-bar-container" 
            onMouseDown={onMouseDown}
            onClick={onClick}
            ref={containerRef}
            style={props.style}
        >
            <div className="progress-bar">
                <div 
                    className="progress-bar-current"
                    style={{
                        width: state.progress + "%"
                    }}
                />
            </div>
            <div 
                className="progress-cursor"
                style={{
                    left: state.progress + "%"
                }}
            />
        </div>
    );

};

export default ProgressBar;