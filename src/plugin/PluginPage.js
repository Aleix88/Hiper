import React, {useState, useRef} from 'react';
import MainButton, {MAIN, SECONDARY} from '../components/main-button/MainButton';
import CodeArea from './CodeArea/CodeArea';
import './PluginPage.css';

const PluginPage = (props) => {

    const [state, setState] = useState({ 
        value: ""
    });

    const codeAreaRef = useRef();

    const onCancel = (e) => {
        props.editionCanceled();
        codeAreaRef.current.resetValue();
        setState(prevState => {
            return {
                ...prevState,
                value: props.configValue
            }
        });
    };

    const onDone = (e) => {
        props.editionDone(state.value);
    };

    const onCodeChange = (value) => {
        setState(prevState => {
            return {
                ...prevState,
                value: value
            }
        });
    };

    return (
        <div className={"plugin-page " + (props.isVisible ? "" : "plugin-hide")}>
            <div className="plugin-modal">
                <h2 className="plugin-modal-title">Plugin settings</h2>
                <div className="plugin-description"> ñaosidf jñasdj fñaosi dfjñaoid jfñaosihfñloashfiuh likuhlsiduah liushd flauhdsflaiuhdaiudhflaiusd lus hlaiduh laiusdlaiduf.</div>
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