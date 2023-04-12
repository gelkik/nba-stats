import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Bets from "./Bets";
import Favorites from "./Favorites";

export const FavoriteContext = createContext()

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [teamBets,setTeamBets] = useState([])
  // const [favBets,setFavBets] = useState([])

  const key = '9856a68566279b87b3115efb81358d3d'
  const sport = 'basketball_nba'
  const regions = 'us'
  const markets = 'h2h,spreads,totals'
  // let endpoint = `/v4/sports/${sport}/odds/?apiKey=${key}&regions=${regions}&markets=${markets}`
  // let endpoint = `/v4/sports/${sport}/odds/?apiKey=${key}&regions=${regions}`
  // `https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=9856a68566279b87b3115efb81358d3d&regions=us&markets=h2h,spreads&oddsFormat=american`

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(()=>{
      // fetch(`https://api.the-odds-api.com$/v4/sports/${sport}/odds/?apiKey=${key}&regions=${regions}&markets=${markets}`)
      fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=9856a68566279b87b3115efb81358d3d&regions=us&markets=h2h,spreads,totals`)
      .then(res=>res.json())
      .then(data=>(
          console.log(data),
          setTeamBets(data)
          ))
  },[])

  // useEffect(()=>{
  //   fetch('/bets',{
  //     method: "POST",
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //     body: JSON.stringify(teamBets),
  //   })
  //   .then(res=>res.json())
  //   .then(data=>(
  //       console.log(data),
  //       setTeamBets(data)
  //       ))
  //   },[])

  return (
    <FavoriteContext.Provider value={[favorites,setFavorites]}>
      <Router>
        <div className="App">
          <NavBar user = {user} setUser = {setUser} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/bets" element={<Bets teamBets={teamBets}/>} />
              <Route path="/favorites" element={<Favorites teamBets={teamBets}/>} />
              <Route path="/login" element={<Login setUser={setUser}/>} />
              <Route path="/signup" element={<SignUp setUser={setUser}/>} />
            </Routes>
        </div>
      </Router>
    </FavoriteContext.Provider>

  );
}

export default App;


{/* {user ? (
          <Routes >
            <Route path="/">
              <Home user={user}/>
            </Route>
          </Routes >
        ) : (
          <Routes >
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Routes >
        )} */}