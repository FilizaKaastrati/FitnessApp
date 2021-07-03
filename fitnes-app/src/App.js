import logo from './logo.svg';
import './App.css';
import AuthRoute from './helpers/AuthRoute';

import {Home}from './Home';
import {Fitnes}from './Fitnes';
import {Trainer}from './Trainer';
import {Klienti}from './Klienti';
import {Pastruesi}from './Pastruesi';
import {Pesha}from './Pesha';
import {Paisje}from './Paisje';
import {Navigation}from './Navigation';
import Order from './components/Order';
import Footer from './footer'
import Login from "./pages/Login";

import{BrowserRouter, Route, Switch}from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    <div className="container">
      {/* <h3 className="m-3 d-flex justify-content-center">
        Fitness App
      </h3> */}
      
      <Navigation/>
      <Switch>
        
      <Route path="/login" component={Login} />
        <AuthRoute path='/' component={Home} exact/>
        <AuthRoute path='/Fitnes' component={Fitnes} exact/>
        <AuthRoute path='/Trainer' component={Trainer} exact/>
        <AuthRoute path='/Klienti' component={Klienti} exact/>
        <AuthRoute path='/Pastruesi' component={Pastruesi} exact/>
        <AuthRoute path='/Pesha' component={Pesha} exact/>
        <AuthRoute path='/Paisje' component={Paisje} exact/>
        <AuthRoute path='/order' component={Order} exact/>
       

      </Switch>
    </div>
    </BrowserRouter>
    <Footer/>
    </>
 
  );
 
}

export default App;
