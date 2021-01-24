import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import WelcomePage from './components/pages/WelcomePage';

function App() {
  return (
    <div className="app">
      <Router>
        <SideNavBar/>
        <div className="main">
          <WelcomePage/>
        </div>
      </Router>
    </div>
  );
}

export default App;