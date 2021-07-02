import logo from './logo.svg';
import './App.css';

import {Home}from './Home';
import {Fitnes}from './Fitnes';
import {Trainer}from './Trainer';
import {Navigation}from './Navigation';

import{BrowserRouter, Route, Switch}from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        Fitness App
      </h3>
      
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/Fitnes' component={Fitnes} exact/>
        <Route path='/Trainer' component={Trainer} exact/>

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
