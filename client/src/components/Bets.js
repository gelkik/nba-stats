import React, {useContext,useState,useEffect } from "react";
// import { FavoriteContext } from "./App";
import Bet from "./Bet";
import Data from "./Data";
// import Favorites from "./Favorites";

function Bets({ teamBets, user }){

    // const [favorites,setFavorites] = useContext(FavoriteContext)
    
    const [teams,setTeams] = useState([])
    const [players,setPlayers] = useState([])
    const [top,setTop] = useState([])

    useEffect(()=>{
        fetch('/teams')
        .then(r=>r.json())
        .then(data=>{
            setTeams(data)
        })
    },[])
    useEffect(()=>{
        fetch('/players')
        .then(r=>r.json())
        .then(data=>{
            setPlayers(data)
        })
    },[])

    // let date = new Date(teamBets[0].commence_time).toLocaleDateString();
    return(
        <div>
           {top.length===0 ? <h1 style={{fontFamily:'monospace', color:'white',display: 'flex', justifyContent:'center', alignItems:'center'}}>Click on a bet to see insights.</h1> : 
           <Data 
                top={top} 
                teams = {teams}
                players = {players}
                className='bets-data'
            />}
            <ul className="bets">
                {teamBets.map((teamBet)=>{
                    return(
                        <div
                        onClick={()=>
                            setTop(teamBet)
                        }>
                            <Bet
                                key={teamBet.id}
                                teamBet = {teamBet}
                                user = {user}
                                
                            />
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Bets;