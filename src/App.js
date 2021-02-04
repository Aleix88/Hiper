import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import WelcomePage from './components/pages/WelcomePage';
import EditorPage from './components/pages/EditorPage';

function App() {

  const [state, setState] = useState({
      projectInfo: null
  });

  const handleSrc = (projectInfo) => {
      setState((prevState) => {
        return {...prevState, projectInfo: projectInfo};
      });
  };

  return (
    <div className="app">
      <Router>
        <SideNavBar/>
        <div className="main">
          <Switch>
            <Route path="/" exact>
              <WelcomePage handleSrc={handleSrc}/>
            </Route>
            <Route path="/editor">
              <EditorPage projectInfo={state.projectInfo}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
