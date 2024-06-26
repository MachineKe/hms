import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/home">
          5🌟HOTEL
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" ><i class="fa fa-hamburger" style={{color:'white'}}></i></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr5">
            {user ? (
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i>{user.name}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
