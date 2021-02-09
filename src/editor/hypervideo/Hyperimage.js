import React from 'react';
import './Hyperimage.css';
import VideoControllBar from './controll-bar/VideoControllBar';
import YouTube from 'react-youtube';
import VideoWrapper from './video-wrapper/VideoWrapper';
import VideoTimer from '../../utils/VideoTimer';
import TagContainer from './tag-container/TagContainer';

class Hyperimage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.controllersRef = React.createRef();
    }

    render() {
        return (
            <div className="hypervideo">
                <div className="hypervideo-content">
                    <img 
                        className="image"
                        src={this.props.media.url}
                    />
                    <TagContainer>
                        {this.props.children}
                    </TagContainer>
                </div>
            </div>
        );    
    }

 }


export default Hyperimage;