import React, { Component } from 'react';
import validateTag from '../model/TagValidator';
import SettingTextfield from '../components/setting-tf/SettingTextfield';
import ConfigSection from './config-section/ConfigSection';
import LinkButton from '../components/link-button/LinkButton';

class TagEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swpTag: null,
            selectedTag: null
        };
        this.__editFinish = this.__editTagFinish.bind(this);
        this.__handleTagEdit = this.__handleTagEdit.bind(this);
        this.__settingTextfield = this.__settingTextfield.bind(this);
        this.openPluginSettings = this.openPluginSettings.bind(this);
    }

    __handleTagEdit(value, attribute) {
        this.setState((prevState) => {
            prevState.swpTag[attribute] = value;        
            return prevState;
        });
    }

    __editTagFinish(editedAttribute) {
        const isValid = validateTag(this.state.swpTag, editedAttribute);
        if (isValid) this.props.editFinished(this.state.swpTag);
        this.setState((prevState) => {
            if (isValid) {
                prevState.selectedTag[editedAttribute] = prevState.swpTag[editedAttribute];
            } else {
                prevState.swpTag[editedAttribute] = prevState.selectedTag[editedAttribute];
            }
            return prevState;
        })
    }

    __settingTextfield(title, placeholder, value, attribute) {
        const thisRef = this;
        return (
            <SettingTextfield 
                title={title} 
                placeholder={placeholder} 
                value={value} 
                handleChange={(e) => {thisRef.__handleTagEdit(e.target.value, attribute)}}
                onEditFinish={() => {thisRef.__editTagFinish(attribute)}}
            />
        );
    }

    __copyTagConfig(tagConfig) {
        return Object.assign(Object.create(Object.getPrototypeOf(tagConfig)), tagConfig);
    }

    setSelectedTag(tagConfig) {
        const thisRef = this;
        this.setState(prevState => {
            return {
                ...prevState,
                swpTag: tagConfig == null ? null : thisRef.__copyTagConfig(tagConfig),
                selectedTag: tagConfig == null ? null : thisRef.__copyTagConfig(tagConfig)
            }
        })
    }

    openPluginSettings() {
        console.log("Open")
        this.props.handlePluginEditor();
    }

    render() {
        if (this.state.swpTag != null) {
            return  ( 
                <div>
                    <ConfigSection title="Tag settings" maxHeight="95%" height="auto" addBorderTop={true}>
                        {this.__settingTextfield("Name", "Tag name", this.state.swpTag.name, "name")}
                        {this.props.hideTimeSettings ? null : this.__settingTextfield("Start", "Start", this.state.swpTag.startTime, "startTime")}
                        {this.props.hideTimeSettings ? null : this.__settingTextfield("Duration", "Duration", this.state.swpTag.duration, "duration")}
                        {this.__settingTextfield("Color", "Color", this.state.swpTag.color, "color")}
                        {this.__settingTextfield("X(%)", "X", this.state.swpTag.x, "x")}
                        {this.__settingTextfield("Y(%)", "Y", this.state.swpTag.y, "y")}
                    </ConfigSection>
                    <ConfigSection>
                        <LinkButton title="Open plugin editor" className="choose-plugin-button" onClick={this.openPluginSettings}></LinkButton>
                    </ConfigSection>
                </div> 
            )
        } else {
            return null;
        }        
    }
}

export default TagEditor;