import React from 'react'
import "./Home.css";

const Home = () => {
  return (
    <section className='home-container'>
      <article className="home-section">
        <div className="home-img-container">
          <img className="home-img" src='https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80' alt='cake covered on top with chocolate'></img>
        </div>
      </article>
    </section>
  )
}

export default Home