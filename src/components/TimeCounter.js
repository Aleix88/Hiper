import React from 'react';
import './TimeCounter.css';

class TimeCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p 
                className="time-text"
                style={this.props.style}
            >
                {this.props.currentTime} / {this.props.duration}
            </p>
        );
    }

}

export default TimeCounter;