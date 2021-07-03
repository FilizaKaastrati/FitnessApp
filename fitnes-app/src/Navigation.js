import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Form} from 'react-bootstrap';
import "./navigation.css";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const Navigation = () => {

    const login = localStorage.getItem('login');

    const logoutHandler = () => {
        localStorage.removeItem('login');
        window.location.reload();
    }
   
    return(
        <div className="test">
        <Navbar  bg="custom" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <NavLink className="navbar navbar-expand-sm navbar-custom" to="/">
            <div className="fitnesIcon">
                <FitnessCenterIcon/> <p>Fitness
               

                    
                </p>
                </div>
                </NavLink>
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/">
                        Home
                    </NavLink>
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/fitnes">
                        Fitnes
                    </NavLink>
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/trainer">
                        Trainer
                    </NavLink>
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/klienti">
                        Klienti
                    </NavLink>

                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/pastruesi">
                        Pastruesi
                    </NavLink>
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/pesha">
                        Pesha
                    </NavLink>
                    
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/paisje">
                        Paisje
                    </NavLink>
                    <NavLink className="navbar navbar-expand-sm navbar-custom" to="/order">
                        Proteinat
                    </NavLink>
                    {login ? (
                        <button  onClick={() => logoutHandler()} 
                        style={{background:"#F8AFA6",
                        border:"#F8AFA6",
                        padding:"10px",
                        "margin-top":"-6px"
                        }}>

                            <ExitToAppIcon>Logout</ExitToAppIcon></button>
                    ) : (
                        <NavLink className="navbar navbar-expand-sm navbar-custom" to="/login">
                        Login
                    </NavLink>
                    )}
                   
              
                </Navbar.Collapse>
                </Navbar>
                </div>

    )

    }
