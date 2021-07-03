import logo from './logo.svg';
import './App.css';

import {Home}from './Home';
import {Fitnes}from './Fitnes';
import {Trainer}from './Trainer';
import {Klienti}from './Klienti';
import {Pesha}from './Pesha';
import {Paisjet}from './Paisjet';
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
        <Route path='/Klienti' component={Klienti} exact/>
        <Route path='/Pesha' component={Pesha} exact/>
        <Route path='/Paisjet' component={Paisjet} exact/>

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
