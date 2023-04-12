import React, {useContext } from "react";
// import { FavoriteContext } from "./App";
import Bet from "./Bet";
// import Favorites from "./Favorites";

function Bets({ teamBets }){

    // const [favorites,setFavorites] = useContext(FavoriteContext)
    return(
        <div>
            <ul className="bets">
                {teamBets.map((teamBet)=>{
                    return(
                    <Bet
                        key={teamBet.id}
                        teamBet = {teamBet}
                    />
                    )
                })}
            </ul>
        </div>
    )
}

export default Bets;