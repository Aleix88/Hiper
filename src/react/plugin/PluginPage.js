import React, {Component} from 'react';
import MainButton, {SECONDARY} from '../components/main-button/MainButton';
import CodeArea from './CodeArea/CodeArea';
import FileBrowser from './FileBrowser/FileBrowser';
import FileManager from '../utils/FileManager';
import './PluginPage.css';

class PluginPage extends Component {

    constructor (props) {
        super(props);
        this.state = { 
            value: "",
            swpPath: "",
            pluginName: "",
            error: false
        };
        this.needsToUpdatePlugin = false;
        this.codeAreaRef = React.createRef();
        this.onCancel = this.onCancel.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.browsePlugin = this.browsePlugin.bind(this);
        this.updatePlugin = this.updatePlugin.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate() {
        if (this.needsToUpdatePlugin) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    value: this.props.plugin.config,
                    swpPath: this.props.plugin.path,
                    pluginName: this.props.plugin.name
                }
            });
            this.codeAreaRef.current.resetValue();
            this.needsToUpdatePlugin = false;
        }
    }

    updatePlugin() {
        this.needsToUpdatePlugin = true;
    }

    onCancel(e) {
        this.props.editionCanceled();
        this.codeAreaRef.current.resetValue();
        this.setState(prevState => {
            return {
                ...prevState,
                value: this.props.plugin.config,
                swpPath: this.props.plugin.path,
                pluginName: this.props.plugin.name
            }
        });
    };

    onDone(e) {
        if (this.state.error) return;
        this.props.editionDone(this.state.value.substring(1, this.state.value.length - 1), this.state.swpPath, this.state.pluginName);
    };

    onCodeChange(value) {
        this.setState(prevState => {
            return {
                ...prevState,
                value: value
            }
        });
    };

    browsePlugin() {
        FileManager.showOpenDialog()
        .then(({canceled, filePaths}) => {
            if (canceled || filePaths.length <= 0) {
                return Promise.reject();
            }
            if (FileManager.getFileExtension(filePaths[0]) !== 'js') {
                return Promise.reject(true);
            }
            this.setState(prevState => ({...prevState, swpPath: filePaths[0]}));
            return FileManager.readFile(filePaths[0]);
        })
        .then((content) => {
            const match = content.match(new RegExp("class" + '\\s(\\w+)'));
            if (match != null && match.length > 1) {
                this.setState(prevState => ({...prevState, pluginName: match[1], error: false}));
            } else {
                return Promise.reject(true);
            }
        })
        .catch((err) => {
            if (err) {
                this.setState(prevState => ({...prevState, error: true}));
            }
        });
    };

    render() {
        return (
            <div className={"plugin-page " + (this.props.isVisible ? "" : "plugin-hide")}>
                <div className="plugin-modal">
                    <h2 className="plugin-modal-title">Plugin settings</h2>
                    <div className="plugin-description"> ñaosidf jñasdj fñaosi dfjñaoid jfñaosihfñloashfiuh likuhlsiduah liushd flauhdsflaiuhdaiudhflaiusd lus hlaiduh laiusdlaiduf.</div>
                    <FileBrowser 
                        onBrowse={this.browsePlugin} 
                        textContent={FileManager.getFileNameFromPath(this.props.plugin.path !== this.state.swpPath ? this.state.swpPath : this.props.plugin.path)}
                        error={this.state.error}
                    />
                    <CodeArea ref={this.codeAreaRef} className="plugin-textarea" onChange={this.onCodeChange} defaultValue={this.props.plugin.config}/>
                    <div className="plugin-buttons">
                        <MainButton type={SECONDARY} title="Cancel" style={{marginRight: "5px"}} handleClick={this.onCancel}></MainButton>
                        <MainButton title="Done" handleClick={this.onDone}></MainButton>
                    </div>
                </div>
            </div>
        );
    }

};

export default PluginPage;