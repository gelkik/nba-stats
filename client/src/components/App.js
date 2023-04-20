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

  // const key = '9856a68566279b87b3115efb81358d3d' kingeorge done
  // const key = 'fef11c60b1eb76c52961a925f63acb65' gelkiksit done
  // const key = '1d244e9e6fbc316063eece62fb897de3' gelkik done
  // const key = 'bc2dd4385eaeba06c7f628b7341a1a35' playawesome2
  // const key = 'e84e85cef7074bc33b6841fab10fbd21' gelkik
  const key = 'e84e85cef7074bc33b6841fab10fbd21'

  const sport = 'basketball_nba'
  const regions = 'us'
  const markets = 'h2h,spreads,totals'
  let endpoint = `/v4/sports/${sport}/odds/?apiKey=${key}&regions=${regions}&markets=${markets}`
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
      // fetch(`https://api.the-odds-api.com$/${endpoint}`)
      fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${key}&regions=us&markets=h2h,spreads,totals`)
      .then(res=>res.json())
      .then(data=>(
          console.log(data),
          setTeamBets(data)
          ))
  },[])

  return (
    <FavoriteContext.Provider value={[favorites,setFavorites]}>
      <Router>
        <div className="App">
          <NavBar user = {user} setUser = {setUser} />
            <Routes>
              <Route exact path="/" element={<Home teamBets={teamBets}/>} />
              <Route path="/bets" element={<Bets teamBets={teamBets} user={user}/>} />
              <Route path="/favorites" element={<Favorites user={user}/>} />
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