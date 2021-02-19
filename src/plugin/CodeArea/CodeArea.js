import React, { Component } from 'react';
import './CodeArea.css';

class CodeArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textValue: "",
            loadDefault: true
        }
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.textareaRef = React.createRef();
        this.cursor = null;
    }

    componentDidUpdate() {
        this.textareaRef.current.selectionStart = this.cursor;
        this.textareaRef.current.selectionEnd = this.cursor;
    }

    onChange(e) {
        this.cursor = e.target.selectionStart;
        
        this.props.onChange(e.target.value);

        this.setState(prevState => {
            return {
                ...prevState,
                loadDefault: false,
                textValue: e.target.value
            }
        });
    }

    onKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            var start = this.textareaRef.current.selectionStart;
            var end = this.textareaRef.current.selectionEnd;
        
            const newValue = 
                this.state.textValue.substring(0, start) + 
                "    " + 
                this.state.textValue.substring(end);
            this.setState(prevState => {
                return {
                    ...prevState,
                    loadDefault: false,
                    textValue: newValue
                }
            });
            this.cursor += 4;
            this.textareaRef.current.selectionStart = this.cursor;
            this.textareaRef.current.selectionEnd = this.cursor;
            this.props.onChange(newValue);
        }
        
    }

    onSelect(e) {
        this.cursor = e.target.selectionStart;
    }

    resetValue() {
        this.setState((prevState) => {
            return {
                ...prevState,
                loadDefault: true
            };
        })
    }

    render() {
        return (
        <textarea 
            ref={this.textareaRef}
            className={"codearea " + this.props.className} 
            placeholder="Write here the plugin settings"
            onKeyDown={this.onKeyDown}
            value={this.state.loadDefault ? this.props.defaultValue : this.state.textValue}
            onChange={this.onChange}
            onSelect={this.onSelect}
        />
        );
    }

}

export default CodeArea;