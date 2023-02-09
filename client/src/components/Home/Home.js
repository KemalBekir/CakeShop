import React from "react";
import { Link } from "react-router-dom";
import OnOffer from "../onOffer/OnOffer";
import "./Home.css";

const Home = () => {
  return (
    <section className="home-container">
      <div className="home-section">
        <h1 className="home-section-title">Life is too short for boring cakes</h1>
        <p className="home-section-paragraph">Celebrate with one of our heavenly cakes. From birthdays to weddings, we have something for every occasion. Trust us to make your event extra sweet. Order yours today.</p>
        <button className="home-section-btn"><Link className="home-section-btn-link" to="/catalogue">Check our Cake's</Link></button>
        <div className="home-img-container">
          <img
            className="home-img"
            src="https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="cake covered on top with chocolate"
          ></img>
        </div>
      </div>
      <OnOffer/>
    </section>
  );
};

export default Home;
