import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { FavoriteContext } from "./App";
// import Login from "./Login";
// import SignUp from "./SignUp";
// import Bets from "./Bets";
// import Home from "./Home";

function NavBar({ user,setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  // const [favorites,setFavorites] = useContext(FavoriteContext)

  useEffect(()=>{
    console.log(user)
  },[])

  return (
    <div className="navbar">
          <div className="logo">DataBasket</div>
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/bets">Bets</Link>
              <Link to="/favorites">Favorites</Link>
              {user ? (
                <ul className='logout-button'onClick={handleLogoutClick}>Logout</ul>
              ) : (
                <>
                  <Link to="/signup">Signup</Link>
                  <Link to="/login">Login</Link>
                </>
              )}
           </ul>
        </div>

    // <header>
    //   <div>
    //     <Link to="/">Home</Link>
    //   </div>
    //   <div>
    //     {user ? (
    //       <button onClick={handleLogoutClick}>Logout</button>
    //     ) : (
    //       <>
    //         <Link to="/signup">Signup</Link>
    //         <Link to="/login">Login</Link>
    //       </>
    //     )}
    //   </div>
    // </header>
  );
}

export default NavBar;