import { Outlet } from "react-router-dom"
import React, { Component } from 'react'

const Home_footer = () => {


  return (
    <div>

    <main>
      <Outlet  />
    </main>

    <footer >
      <div className="content has-text-centered">
        <p>
          Ini Footer
        </p>
      </div>
    </footer>

  </div>
  )
}

export default Home_footer