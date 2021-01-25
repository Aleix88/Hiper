import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import WelcomePage from './components/pages/WelcomePage';
import EditorPage from './components/pages/EditorPage';

function App() {
  return (
    <div className="app">
      <Router>
        <SideNavBar/>
        <div className="main">
          <Switch>
            <Route path="/" exact>
              <WelcomePage/>
            </Route>
            <Route path="/editor">
              <EditorPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
