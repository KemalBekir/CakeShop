import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagramSquare,faFacebookSquare,faTiktok } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer-container">
      <div className="footer-list-container">
        <h5 className="footer-title">Peter's Cakes</h5>
        <ul className="footer-list">
          <li className="footer-list-item"><a className="footer-list-item-link" href="https://www.instagram.com/peterscakes1/" target="_blank"><FontAwesomeIcon icon={faInstagramSquare}/></a></li>
          <li className="footer-list-item"><a className="footer-list-item-link" href="https://www.facebook.com/bakerpetes" target="_blank"><FontAwesomeIcon icon={faFacebookSquare}/></a></li>
          <li className="footer-list-item"><a className="footer-list-item-link" href="https://www.tiktok.com/@peterscake1" target="_blank"><FontAwesomeIcon icon={faTiktok}/></a></li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
