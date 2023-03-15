import { Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

<nav className="navbar is-black" role="navigation" aria-label="main navigation">
<div class="navbar-brand">
  <a class="navbar-item" href="https://bulma.io">
    <img src="/Asset/logowhite.png" width="112" height="28"/>
  </a>
</div>

<div id="navbarBasicExample" class="navbar-menu">


  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a class="button is-dark" href="/register">
          <strong>Sign up</strong>
        </a>
      </div>
    </div>
  </div>
</div>
</nav>



const LoginLayout = () => {


  return (
    <div>

      <nav class="navbar is-black" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="/Asset/logowhite.png" width="112" height="28"/>
          </a>
      

        </div>
      
        <div id="navbarBasicExample" class="navbar-menu">

      
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a className="button is-ghost" style={{textDecoration : "none", color :"white"}} href="/register">
                  <strong>Sign Up</strong>
                </a>
                <a className="button is-ghost" style={{textDecoration : "none", color :"white"}} href="/">
                  <strong>Log in</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>


      <main>
          <Outlet />
      </main> 


    </div>
  )
}

export default LoginLayout