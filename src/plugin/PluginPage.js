import React, {useState, useRef} from 'react';
import MainButton, {SECONDARY} from '../components/main-button/MainButton';
import CodeArea from './CodeArea/CodeArea';
import FileBrowser from './FileBrowser/FileBrowser';
import FileManager from '../utils/FileManager';
import './PluginPage.css';

const PluginPage = (props) => {

    const [state, setState] = useState({ 
        value: "",
        path: "",
        pluginName: ""
    });

    const codeAreaRef = useRef();

    const onCancel = (e) => {
        props.editionCanceled();
        codeAreaRef.current.resetValue();
        setState(prevState => {
            return {
                ...prevState,
                value: props.plugin.config,
                path: props.plugin.path,
                pluginName: props.plugin.name
            }
        });
    };

    const onDone = (e) => {
        if (state.error) return;
        props.editionDone(state.value.substring(1, state.value.length - 1), state.path, state.pluginName);
    };

    const onCodeChange = (value) => {
        const regex = new RegExp(/\\/g)
        setState(prevState => {
            return {
                ...prevState,
                value: JSON.stringify(value.replaceAll('\n', '')).replace(regex, "")
            }
        });
    };

    const browsePlugin = () => {
        FileManager.showOpenDialog()
        .then(({canceled, filePaths}) => {
            if (canceled || filePaths.length <= 0) {
                return Promise.reject();
            }
            if (FileManager.getFileExtension(filePaths[0]) !== 'js') {
                return Promise.reject(true);
            }
            setState(prevState => ({...prevState, path: filePaths[0]}));
            return FileManager.readFile(filePaths[0]);
        })
        .then((content) => {
            const match = content.match(new RegExp("class" + '\\s(\\w+)'));
            if (match != null && match.length > 1) {
                setState(prevState => ({...prevState, pluginName: match[1], error: false}));
            } else {
                return Promise.reject(true);
            }
        })
        .catch((err) => {
            if (err) {
                setState(prevState => ({...prevState, error: true}));
            }
        });
    };

    return (
        <div className={"plugin-page " + (props.isVisible ? "" : "plugin-hide")}>
            <div className="plugin-modal">
                <h2 className="plugin-modal-title">Plugin settings</h2>
                <div className="plugin-description"> ñaosidf jñasdj fñaosi dfjñaoid jfñaosihfñloashfiuh likuhlsiduah liushd flauhdsflaiuhdaiudhflaiusd lus hlaiduh laiusdlaiduf.</div>
                <FileBrowser 
                    onBrowse={browsePlugin} 
                    textContent={FileManager.getFileNameFromPath(state.path)}
                    error={state.error}
                />
                <CodeArea ref={codeAreaRef} className="plugin-textarea" onChange={onCodeChange} defaultValue={props.plugin.config}/>
                <div className="plugin-buttons">
                    <MainButton type={SECONDARY} title="Cancel" style={{marginRight: "5px"}} handleClick={onCancel}></MainButton>
                    <MainButton title="Done" handleClick={onDone}></MainButton>
                </div>
            </div>
        </div>
    );

};

export default PluginPage;