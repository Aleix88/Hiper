import React, { Component } from 'react';
import SettingTextfield from '../components/setting-tf/SettingTextfield';
import ConfigSection from './config-section/ConfigSection';
import validate from '../model/VideoValidator';

class VideoSettingsEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSettings: null,
            swpSettings: null
        };
        this.__editFinish = this.__editFinish.bind(this);
        this.__handleEdit = this.__handleEdit.bind(this);
        this.__settingTextfield = this.__settingTextfield.bind(this);
    }

    __handleEdit(value, attribute) {
        this.setState((prevState) => {
            if (prevState.swpSettings == null) {
                let swpSettings = {
                    videoTitle: this.props.defaultSettings.videoTitle,
                    width: this.props.defaultSettings.width,
                    height: this.props.defaultSettings.height
                };
                swpSettings[attribute] = value;

                return {
                    currentSettings: this.props.defaultSettings,
                    swpSettings: swpSettings
                }
            }

            prevState.swpSettings[attribute] = value;        
            return prevState;
        });
    }

    __editFinish(editedAttribute) {
        if (this.state.swpSettings == null) return;
        const isValid = validate(this.state.swpSettings, editedAttribute);
        if (isValid) this.props.editFinished(this.state.swpSettings);
        this.setState((prevState) => {
            if (isValid) {
                prevState.currentSettings[editedAttribute] = prevState.swpSettings[editedAttribute];
            } else {
                prevState.swpSettings[editedAttribute] = prevState.currentSettings[editedAttribute];
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
                handleChange={(e) => {thisRef.__handleEdit(e.target.value, attribute)}}
                onEditFinish={() => {thisRef.__editFinish(attribute)}}
            />
        );
    }

    render() {
        const settings = this.state.swpSettings == null ? this.props.defaultSettings : this.state.swpSettings;
        return  ( 
            <div>
                <ConfigSection title="Video settings" height="auto" addBorderTop={false}>
                    {this.__settingTextfield("Video title", "Video title", settings.videoTitle, "videoTitle")}
                    {this.__settingTextfield("Width (px)", settings.width, settings.width, "width")}
                    {this.__settingTextfield("Height (px)", settings.height,  settings.height, "height")}
                </ConfigSection>
            </div> 
        )
    }
}

export default VideoSettingsEditor;