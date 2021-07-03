import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import "./login.css"
import LockOpenIcon from '@material-ui/icons/LockOpen';

const Login = () => {
    let history = useHistory();

    // nese egziston login nuk e len me hi te page LOGIN
    useEffect(() => {
        const login = localStorage.getItem('login');
        if(login){
            history.push('/')
        }
    })

    const login = () => {
        localStorage.setItem('login', true);
        window.location.reload();
    }

    return(
        
        <form style={{
            
        }}>
             
        <div className="form-inner"
        
         style={{"margin-left":"450px",
         "margin-top":"100px"}}>
                <h2>Fill to login</h2>
               
                <div className="form-group">

                

                </div> 
                <div className="form-group">
                
                <input type="email" name="email" id="email" placeholder="E-mail" />
            </div>
            <div className="form-group">
                
                <input type="password" name="password" placeholder="Password" />
            </div>
            <button  onClick={() => login()} style={{background: "#F8AFA6",
         
         border: "none",
         color: "white",
         "border-radius":"4px",
         padding: "6px 12px",
         "margin-left":"59px",
     
         display: "inline-block"}}> Login </button>

            </div>
            </form>
    )
}

export default Login;