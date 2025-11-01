import './Footer.module.css'
import facebookIcon from '../assets/facebook-f-brands.svg';
import linkedinIcon from '../assets/linkedin-in-brands.svg';
import twitterIcon from '../assets/twitter-brands.svg';
import googleIcon from '../assets/google-brands.svg';
import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <p>Copyright &copy; 2025. All rights reserved</p>
                <nav className="icon-deck">
                    <a href="https://www.facebook.com/"><img src={facebookIcon} alt="Facebook" /></a>
                    <a href="https://www.google.com/"><img src={googleIcon} alt="Google" /></a>
                    <a href="https://www.linkedin.com/"><img src={linkedinIcon} alt="LinkedIn" /></a>
                    <a href="https://x.com/"><img src={twitterIcon} alt="Twitter" /></a>
                </nav>
            </div>
        )
    }
}
