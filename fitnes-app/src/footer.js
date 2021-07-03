import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Footer = () => (
  <div className="footer" style={{height:"3vh"}}>
      <div className="txt">
    <p sty>&copy UBT 2021</p>
    </div>
    <div className="social-icons">
    <InstagramIcon/>
    <FacebookIcon/>
    <TwitterIcon/>
    <YouTubeIcon/>
    </div>
  </div>
);

export default Footer;