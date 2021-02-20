import React, { Component } from 'react';
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
import {YOUTUBE_TYPE, IMG_TYPE} from '../model/MediaTypes';
import Hyperimage from './hypervideo/Hyperimage';
import PluginPage from '../plugin/PluginPage';
import Plugin from '../model/Plugin';
import Alert from '../components/alert/Alert';

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
            },
            showPluginEditor: false,
            alert: null
        };
        this.__addNewTag = this.__addNewTag.bind(this);
        this.__selectTag = this.__selectTag.bind(this);
        this.__loadTagLabels = this.__loadTagLabels.bind(this);
        this.__deleteTag = this.__deleteTag.bind(this);
        this.__handleEditedTag = this.__handleEditedTag.bind(this);
        this.__handleEditedVideo = this.__handleEditedVideo.bind(this);
        this.__handleAlertClick = this.__handleAlertClick.bind(this);
        this.openPluginEditor = this.openPluginEditor.bind(this);
        this.__pluginCanceled = this.__pluginCanceled.bind(this);
        this.__pluginDone = this.__pluginDone.bind(this);
        this.TAG_REGEX = new RegExp(/^tag-[0-9]+/);
        this.nCreateTags = 0;
        this.hypervideoRef = React.createRef();
        this.tagEditorRef = React.createRef();
        this.pluginPageRef = React.createRef();
    }

    exportCode() {
        const projectInfo = this.props.projectInfo;
        generateEmbed(
            this.state.videoSettings,
            this.state.tags,
            projectInfo.projectPath,
            projectInfo.media,
            projectInfo.mediaType)
        .then (() => {
            this.setState(prevState => ({...prevState, alert: {
                title: "Export successful!", 
                description: "Open the index.html file in your project folder to see the final result.", 
                buttonText: "OK"
            }}))
        })
        .catch ((err) => {
            this.setState(prevState => ({...prevState, alert: {
                title: "Export error!", 
                description: "Please check that your video/image and plugins configurations are ok.", 
                buttonText: "OK"
            }}))
        });
    }

    __handleAlertClick() {
        this.setState(prevState => ({...prevState, alert: null}))
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
        const currentVideoTime = parseInt(this.hypervideoRef.current == null ? null : this.hypervideoRef.current.getCurrentTime());
        const newTag = new TagConfig(this.nCreateTags++, "tag-"+tagNameIndex, 50,50, currentVideoTime);
        this.setState(prevState => {return {...prevState, tags: [...prevState.tags, newTag]}});
        this.__selectTag(newTag.id);
    }

    __selectTag(id) {
        const thisRef = this;
        this.setState(prevState => {
            const selectedTag = this.copyObject(prevState.tags.find(t => t.id === id));
            thisRef.tagEditorRef.current.setSelectedTag(selectedTag);
            return {
                ...prevState,
                selectedTag: selectedTag,
                tags: prevState.tags.map(t => {
                    let newTag = this.copyObject(t);
                    newTag.isSelected = newTag.id === id;
                    return newTag;
                })
            }
        });
        if (this.pluginPageRef.current) {
            this.pluginPageRef.current.updatePlugin();
        }
    }

    __deleteTag(id) {
        const thisRef = this;
        this.setState(prevState => {
            let filteredTags = prevState.tags.filter(t => t.id !== id).map((t) => this.copyObject(t));
            let selectedTag = null;
            if (filteredTags.length > 0) {
                selectedTag = this.copyObject(filteredTags[0]);   
                filteredTags = filteredTags.map(t => {
                    t.isSelected = t.id === selectedTag.id;
                    return t;
                });
            }
            thisRef.tagEditorRef.current.setSelectedTag(selectedTag);
            return {
                ...prevState,
                selectedTag: selectedTag,
                tags: filteredTags
            };
        });
        if (this.pluginPageRef.current) {
            this.pluginPageRef.current.updatePlugin();
        }
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

    openPluginEditor() {
        this.setState(prevState => {
            return {
                ...prevState,
                showPluginEditor: true
            };
        });
    }

    __pluginCanceled() {
        this.setState(prevState => {
            return {...prevState, showPluginEditor: false}
        })
    }

    __pluginDone(config, path, name) {
        const plugin = new Plugin(path, config, name);
        console.log("New plugin: ", plugin)
        this.setState((prevState) => {
            let selectedTag = this.copyObject(prevState.selectedTag);
            selectedTag.plugin = plugin;
            selectedTag.isSelected = true;
            let tags = prevState.tags.map(t => t.id === selectedTag.id ? selectedTag : t);
            return {
                ...prevState,
                selectedTag: selectedTag,
                showPluginEditor: false,
                tags: tags
            };
        })
    }

    render() {
        console.log(this.state.tags)
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
                    {
                        this.props.projectInfo.mediaType === IMG_TYPE ? 
                        <Hyperimage media={this.props.projectInfo.media}>
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
                        </Hyperimage>

                        :

                        <Hypervideo media={this.props.projectInfo.media} isFromYoutube={this.props.projectInfo.mediaType === YOUTUBE_TYPE} ref={this.hypervideoRef}>
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
                    }
                    
                </div>
                <div className="config-inspector app-section">
                    <VideoSettingsEditor ref={this.videoEditorRef} editFinished={this.__handleEditedVideo} defaultSettings={this.copyObject(this.state.videoSettings)}/>
                    <TagEditor ref={this.tagEditorRef} editFinished={this.__handleEditedTag} hideTimeSettings={this.props.projectInfo.mediaType === IMG_TYPE} handlePluginEditor={this.openPluginEditor}/>
                </div>
                {
                    this.state.selectedTag ? 
                    <PluginPage 
                        ref={this.pluginPageRef}
                        isVisible={this.state.showPluginEditor} 
                        editionCanceled={this.__pluginCanceled} 
                        editionDone={this.__pluginDone}
                        plugin={this.state.selectedTag.plugin}
                    />
                    : null
                }
                {
                    this.state.alert ? 
                    <Alert 
                        title={this.state.alert.title}
                        description={this.state.alert.description}
                        buttonText={this.state.alert.buttonText}
                        handleClick={this.__handleAlertClick}
                    />
                    : null
                }
            </div>
        );
    }
}



export default EditorPage;