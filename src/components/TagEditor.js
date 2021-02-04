import React, { Component } from 'react';
import Tag from './Tag';
import './TagEditor.css';

class TagEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }


    onClick() {

    }

    render() {

        return (
            <div className="tag-container" onClick={(e) => {this.onClick()}}>
                {
                    this.props.children
                }
            </div>
        );

    }


}

export default TagEditor;