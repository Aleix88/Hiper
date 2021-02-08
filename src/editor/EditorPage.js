import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hypervideo from './hypervideo/Hypervideo';
import './EditorPage.css';
import ConfigSection from './config-section/ConfigSection';
import TagLabel from './tag-label/TagLabel';
import LinkButton from '../components/link-button/LinkButton';
import TagConfig from '../model/TagConfig';
import Tag from './tag/Tag';
import generateEmbed from '../utils/EmbedGenerator';
import TagEditor from './TagEditor';
import VideoSettingsEditor from './VideoSettingsEditor';

class EditorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            selectedTag: null,
            videoSettings: {
                videoTitle: "My hypervideo",
                height: 390,
                width: 640
            }
        };
        this.__addNewTag = this.__addNewTag.bind(this);
        this.__selectTag = this.__selectTag.bind(this);
        this.__loadTagLabels = this.__loadTagLabels.bind(this);
        this.__deleteTag = this.__deleteTag.bind(this);
        this.__handleEditedTag = this.__handleEditedTag.bind(this);
        this.__handleEditedVideo = this.__handleEditedVideo.bind(this);
        this.TAG_REGEX = new RegExp(/^tag-[0-9]+/);
        this.nCreateTags = 0;
        this.hypervideoRef = React.createRef();
        this.tagEditorRef = React.createRef();
    }

    exportCode() {
        const projectInfo = this.props.projectInfo;
        generateEmbed(
            this.state.videoSettings,
            this.state.tags,
            projectInfo.projectPath,
            projectInfo.media,
            projectInfo.isFromYoutube)
        .then (() => {
            console.log("Done")
        })
        .catch ((err) => {
            console.log(err)
        });
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
        const tagNameIndex = sortedTags.length > 0 ? parseInt(lastTag.name.replace('tag-', '')) + 1 : 0;
        const currentVideoTime = parseInt(this.hypervideoRef.current.getCurrentTime());
        const newTag = new TagConfig(this.nCreateTags++, "tag-"+tagNameIndex, 50,50, currentVideoTime);
        this.setState(prevState => {return {...prevState, tags: [...prevState.tags, newTag]}});
        this.__selectTag(newTag.id);
    }

    __selectTag(id) {
        const thisRef = this;
        this.setState(prevState => {
            const selectedTag = prevState.tags.find(t => t.id === id);
            thisRef.tagEditorRef.current.setSelectedTag(selectedTag);
            return {
                ...prevState,
                selectedTag: selectedTag,
                tags: prevState.tags.map(t => {
                    t.isSelected = t.id === id;
                    return t;
                })
            }
        });
    }

    __deleteTag(id) {
        const thisRef = this;
        this.setState(prevState => {
            const filteredTags = prevState.tags.filter(t => t.id !== id);
            let selectedTag = null;
            if (filteredTags.length > 0) {
                thisRef.__selectTag(filteredTags[0].id);
                selectedTag = filteredTags[0];   
            }
            thisRef.tagEditorRef.current.setSelectedTag(selectedTag);
            return {
                ...prevState,
                selectedTag: selectedTag,
                tags: filteredTags
            };
        });
    }

    __loadTagLabels() {
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

    __handleEditedTag(tagConfig) {
        this.setState(prevState => {
            return {
                ...prevState,
                selectedTag: tagConfig,
                tags: prevState.tags.map(t => t.id === tagConfig.id ? tagConfig : t)
            }
        });
    }

    __handleEditedVideo(videoSettings) {
        this.setState(prevState => {
            return {
                ...prevState,
                videoSettings: videoSettings
            }
        })
    }

    copyObject(obj) {
        return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
    }

    render() {
        return (
            <div className="editor-page">
                <div className="left-window app-section">
                    <ConfigSection title="Tags" maxHeight="95%" height="95%" addBorderTop={false}>
                        {this.__loadTagLabels()}
                    </ConfigSection>
                    <div className="add-tag-button-container">
                    <LinkButton title="Create new tag" onClick={this.__addNewTag}/>
                    </div>
                </div>
                <div className="editor-main">
                    <Link to="/">Home</Link>
                    <Hypervideo media={this.props.projectInfo.media} isFromYoutube={this.props.projectInfo.isFromYoutube} ref={this.hypervideoRef}>
                        {
                            this.state.tags.map(t => 
                                <Tag 
                                    key={t.id} 
                                    x={t.x} 
                                    y={t.y}
                                    color={t.color}
                                    timestamp={t.startTime}
                                    duration={t.duration}
                                />
                            )
                        }
                    </Hypervideo>
                </div>
                <div className="config-inspector app-section">
                    <VideoSettingsEditor ref={this.videoEditorRef} editFinished={this.__handleEditedVideo} defaultSettings={this.copyObject(this.state.videoSettings)}/>
                    <TagEditor ref={this.tagEditorRef} editFinished={this.__handleEditedTag}/>
                </div>
            </div>
        );
    }
}



export default EditorPage;