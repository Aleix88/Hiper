import React from 'react';
import './Hyperimage.css';
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
                        alt="Hyperimage"
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