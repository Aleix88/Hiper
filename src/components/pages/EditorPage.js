import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hypervideo from '../Hypervideo';
import './EditorPage.css';
import ConfigSection from '../ConfigSection';
import TagLabel from '../TagLabel';
import LinkButton from '../LinkButton';
import TagConfig from '../../model/TagConfig';
import Tag from '../Tag';
import SettingTextfield from '../SettingTextfield';
import validateTag from '../../model/TagValidator';

class EditorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            selectedTag: null,
            swpTag: null
        };
        this.__addNewTag = this.__addNewTag.bind(this);
        this.__selectTag = this.__selectTag.bind(this);
        this.__loadTagsList = this.__loadTagsList.bind(this);
        this.__deleteTag = this.__deleteTag.bind(this);
        this.__editFinish = this.__editFinish.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.TAG_REGEX = new RegExp(/^tag-[0-9]+/);
        this.nCreateTags = 0;
    }

    __addNewTag() {
        const sortedTags = this.state.tags.filter(t => {
            return t.name.match(this.TAG_REGEX);
        }).sort((t1, t2) => {
            const n1 = parseInt(t1.name.replace('tag-',''));
            const n2 = parseInt(t2.name.replace('tag-',''));
            return (n1 < n2) ? 1 : (n1 > n2 ? -1 : 0);
        });
        const lastTag = sortedTags[0];
        const tagNameIndex = this.state.tags.length > 0 ? parseInt(lastTag.name.replace('tag-', '')) + 1 : 0;
        const newTag = new TagConfig(this.nCreateTags++, "tag-"+tagNameIndex, 50,50,1);
        this.setState(prevState => {return {...prevState, tags: [...prevState.tags, newTag]}});
        this.__selectTag(newTag.id);
    }

    __selectTag(id) {
        const thisRef = this;
        this.setState(prevState => {
            const selectedTag = prevState.tags.find(t => t.id === id);
            return {
                ...prevState,
                selectedTag: selectedTag,
                swpTag: thisRef.__copyTagConfig(selectedTag),
                tags: prevState.tags.map(t => {
                    t.isSelected = t.id === id;
                    return t;
                })
            }
        });
    }

    __deleteTag(id) {
        this.setState(prevState => {
            return {
                ...prevState,
                tags: prevState.tags.filter(t => t.id !== id)
            };
        });
    }

    __loadTagsList() {
        const thisRef = this;
        return this.state.tags.map(t => {
            return <TagLabel 
                key={t.id} 
                id={t.id}
                name={t.name}
                handleSelection={thisRef.__selectTag}
                handleDelete={thisRef.__deleteTag}
                otherSelected={!t.isSelected}
            />}
        );
    }

    __handleChange(value, attribute) {
        this.setState((prevState) => {
            prevState.swpTag[attribute] = value;        
            return prevState;
        });
    }

    __editFinish(editedAttribute) {
        const isValid = validateTag(this.state.swpTag, editedAttribute);
        this.setState((prevState) => {
            if (isValid) {
                prevState.selectedTag[editedAttribute] = prevState.swpTag[editedAttribute];
            } else {
                prevState.swpTag[editedAttribute] = prevState.selectedTag[editedAttribute];
            }
            return prevState;
        })
    }

    __copyTagConfig(tagConfig) {
        return Object.assign(Object.create(Object.getPrototypeOf(tagConfig)), tagConfig);
    }

    __settingTextfield(title, placeholder, value, attribute) {
        const thisRef = this;
        return (
            <SettingTextfield 
                title={title} 
                placeholder={placeholder} 
                value={value} 
                handleChange={(e) => {thisRef.__handleChange(e.target.value, attribute)}}
                onEditFinish={() => {thisRef.__editFinish(attribute)}}
            />
        );
    }

    render() {
        return (
            <div className="editor-page">
                <div className="left-window app-section">
                    <ConfigSection title="Tags" maxHeight="95%" height="95%">
                        {this.__loadTagsList()}
                    </ConfigSection>
                    <div className="add-tag-button-container">
                    <LinkButton title="Create new tag" onClick={this.__addNewTag}/>
                    </div>
                </div>
                <div className="editor-main">
                    {/* <Link to="/">Home</Link> */}
                    <Hypervideo src={this.props.src} isFromYoutube={this.props.isFromYoutube}>
                        {
                            this.state.tags.map(t => 
                                <Tag 
                                    key={t.id} 
                                    x={t.x} 
                                    y={t.y}
                                    color={t.color}
                                />
                            )
                        }
                    </Hypervideo>
                </div>
                <div className="config-inspector app-section">
                    {
                        this.state.selectedTag != null ? 
                        (
                            <div>
                                <ConfigSection title="Tag setting" maxHeight="95%" height="auto">
                                    {this.__settingTextfield("Name", "Tag name", this.state.swpTag.name, "name")}
                                    {this.__settingTextfield("Start", "Start", this.state.swpTag.startTime, "startTime")}
                                    {this.__settingTextfield("Duration", "Duration", this.state.swpTag.duration, "duration")}
                                    {this.__settingTextfield("Color", "Color", this.state.swpTag.color, "color")}
                                    {this.__settingTextfield("X(%)", "X", this.state.swpTag.x, "x")}
                                    {this.__settingTextfield("Y(%)", "Y", this.state.swpTag.y, "y")}
                                </ConfigSection>
                                <ConfigSection>
                                    <LinkButton title="Choose plugin" className="choose-plugin-button"></LinkButton>
                                </ConfigSection>
                                <ConfigSection title="Plugin setting">
                                </ConfigSection>
                            </div>
                        )
                        :
                        null
                    }
                    
                </div>
            </div>
        );
    }
}



export default EditorPage;