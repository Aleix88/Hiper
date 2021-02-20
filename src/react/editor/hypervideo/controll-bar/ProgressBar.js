import React from 'react';
import './ProgressBar.css';

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dragStart: false
        };
        this.containerRef = React.createRef();
        this.calculateBarPosition = this.calculateBarPosition.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onMouseDown(event) {
        this.setState((prevState) => {return {...prevState, dragStart: true}});
    };

    onMouseUp(event) {
        if (this.state.dragStart) {
            const progress = this.calculateBarPosition(event.clientX);
            this.props.onProgressFixed(progress);
        }
        this.setState((prevState) => {return {...prevState, dragStart: false}});
    };

    onClick(event) {
        const progress = this.calculateBarPosition(event.clientX);
        this.props.onProgressFixed(progress);
    }

    onMouseMove(event) {
        if (this.state.dragStart) {
            this.calculateBarPosition(event.clientX);
        }
    };

    calculateBarPosition(clientX) {
        const containerRect = this.containerRef.current.getBoundingClientRect();
        const currentX = clientX - containerRect.x;
        let progress = currentX / containerRect.width;
        progress = progress < 0 ? 0 : progress;
        progress = progress > 1 ? 1: progress;
        progress = Math.floor(progress * 100);
        this.props.handleChange(progress);
        return progress;
    };

    lengthUpdated(currentLength) {
        let length = currentLength > this.props.maxLength ? this.props.maxLength : currentLength;
        length = currentLength < 0 ? 0 : currentLength;
        const currentProgress = Math.round((parseFloat(length) / parseFloat(this.props.maxLength)) * 100); 
        return currentProgress;
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    render() {
        return (
            <div className={this.props.isInteractionEnabled ? "progress-bar-container" : "progress-bar-container progress-bar-disabled"}
                onMouseDown={this.onMouseDown}
                onClick={this.onClick}
                ref={this.containerRef}
                style={this.props.style}
            >
                <div className="progress-bar">
                    <div 
                        className="progress-bar-current"
                        style={{
                            width: this.lengthUpdated(this.props.currentLength) + "%"
                        }}
                    />
                </div>
                <div 
                    className="progress-cursor"
                    style={{
                        left: this.lengthUpdated(this.props.currentLength) + "%"
                    }}
                />
            </div>
        );
    }
    
}

export default ProgressBar;