import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hypervideo from '../Hypervideo';
import './EditorPage.css';
import ConfigSection from '../ConfigSection';
import TagLabel from '../TagLabel';
import LinkButton from '../LinkButton';
import TagConfig from '../../model/TagConfig';
import Tag from '../Tag';

class EditorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
        this.__addNewTag = this.__addNewTag.bind(this);
    }

    __addNewTag() {
        const newTag = new TagConfig("1", 50,50,1);
        this.setState(prevState => {return {...prevState, tags: [...prevState.tags, newTag]}});
    }

    render() {
        return (
            <div className="editor-page">
                <div className="left-window app-section">
                    <ConfigSection title="Tags" maxHeight="95%" height="95%">
                        {
                            this.state.tags.map(t => 
                                <TagLabel 
                                    key={t.id} 
                                    name={"Tag"+t.id}
                                />
                            )
                        }
                    </ConfigSection>
                    <div className="add-tag-button-container">
                    <LinkButton title="Create new tag" onClick={this.__addNewTag}/>
                    </div>
                </div>
                <div className="editor-main">
                    <Link to="/">Home</Link>
                    <Hypervideo src={this.props.src} isFromYoutube={this.props.isFromYoutube}>
                        {
                            this.state.tags.map(t => 
                                <Tag 
                                    key={t.id} 
                                    x={t.x} 
                                    y={t.y}
                                />
                            )
                        }
                    </Hypervideo>
                </div>
                <div className="config-inspector app-section">
                    Inspector
                </div>
            </div>
        );
    }
}



export default EditorPage;