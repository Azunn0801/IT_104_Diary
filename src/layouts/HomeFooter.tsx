import React from 'react'
import '../pages/user/Home.module.css'

const HomeFooter: React.FC = () => {
  return (
    <footer className="footer bg-light">
      <div className="container footer-content">
        <div className="footer-col footer-logo">
          <h4 className="site-logo">MY BLOG</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum aliquet accumsan porta lectus
            ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.
          </p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul className="list-unstyled">
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <ul className="list-unstyled">
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <ul className="list-unstyled">
            <li><a href="#">Free eBooks</a></li>
            <li><a href="#">Development Tutorial</a></li>
            <li><a href="#">How to - Blog</a></li>
            <li><a href="#">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-social text-center mt-3">
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-github"></i></a>
      </div>
    </footer>
  );
};

export default HomeFooter;
