import './App.css';
import React, {useState, useRef} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SideNavBar from './navbar/SideNavBar';
import WelcomePage from './welcome/WelcomePage';
import EditorPage from './editor/EditorPage';

function App() {

  const [state, setState] = useState({
      projectInfo: null
  });

  const editorRef = useRef();

  const handleSrc = (projectInfo) => {
      setState((prevState) => {
        return {...prevState, projectInfo: projectInfo};
      });
  };

  const handleExportecode = () => {
    editorRef.current.exportCode();
  };

  return (
    <div className="app">
      <Router>
        <SideNavBar exportCode={handleExportecode}/>
        <div className="main">
          <Switch>
            <Route path="/" exact>
              <WelcomePage handleSrc={handleSrc}/>
            </Route>
            <Route path="/editor">
              <EditorPage ref={editorRef} projectInfo={state.projectInfo}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
