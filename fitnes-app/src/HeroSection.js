import React from 'react'
import "./HeroSection.css"

export default function HersoSection() {
    return (
        <div className='hero-container'>
          <img src="/img/cover.jpg"/>  
            <h1>ARE YOU READY</h1>
            <p>What are you waiting for</p>
        <div className="hero-btns">
            <button className="btns" buttonStyle='btn--primary' buttonSize='btn--large' style={{background: "pink",
         
         border: "none",
         color: "white",
         padding: "15px 32px",
         "margin-right":"9px",
         display: "inline-block",
       
       }}>
                TRAIN IN GYM
            </button>

            
            <button className="btns" buttonStyle='btn--primary' buttonSize='btn--large' style={{background: "#F8AFA6",
         
         border: "none",
         color: "white",
         padding: "15px 32px",
     
         display: "inline-block",
       
       }}>
            TRAIN IN HOME<i className='far fa-play-circle'/>
            </button>
        </div>
            
        </div>
    )
}
