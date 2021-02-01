import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import WelcomePage from './components/pages/WelcomePage';
import EditorPage from './components/pages/EditorPage';

function App() {

  const [state, setState] = useState({
      fileSrc: "",
      isFromYoutube: false
  });

  const handleSrc = (src, isFromYoutube) => {
      setState({
        fileSrc: src,
        isFromYoutube: isFromYoutube
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
              <EditorPage src={state.fileSrc} isFromYoutube={state.isFromYoutube}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
