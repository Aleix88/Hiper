import React from 'react';
import './TimeCounter.css';

class TimeCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    __secondsToString(seconds) {
        const hours = Math.floor(this.props.currentTime/3600);
        const min = Math.floor((seconds - (hours * 3600)) / 60).toString().padStart(2, "0");
        const sec = (seconds - (hours * 3600) - (min * 60)).toString().padStart(2, "0");
        return hours <= 0 ? min + ":" + sec : hours + ":" + min + ":" + sec;
    }

    render() {


        return (
            <div 
                className="time-text"
                style={this.props.style}
            >
                {this.__secondsToString(this.props.currentTime)} / {this.__secondsToString(this.props.duration)}
            </div>
        );
    }

}

export default TimeCounter;