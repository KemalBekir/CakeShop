import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagramSquare,faFacebookSquare,faTiktok } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-list-container">
        <h5 className="footer-title">Cake Shop</h5>
        <ul className="footer-list">
          <li className="footer-list-item"><a className="footer-list-item-link" href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon icon={faInstagramSquare}/></a></li>
          <li className="footer-list-item"><a className="footer-list-item-link" href="https://www.facebook.com/" target="_blank"><FontAwesomeIcon icon={faFacebookSquare}/></a></li>
          <li className="footer-list-item"><a className="footer-list-item-link" href="https://www.tiktok.com/" target="_blank"><FontAwesomeIcon icon={faTiktok}/></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
