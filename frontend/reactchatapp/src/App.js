import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'
import Loginpage from './pages/Loginpage'



// import logo from './logo.svg';
//import './App.css';
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
              <Loginpage></Loginpage>
          </Route>
          <Route path="/chat">
              <Chatpage></Chatpage>
          </Route>
          <Route path="/">
            <Homepage></Homepage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
