import React, { useContext,useState,useEffect } from "react";
import { FavoriteContext } from "./App";
import Favorite from "./Favorite"
import Data from "./Data";

function Favorites({user}){

    // const [flip,setFlip] = useState(false)
    // const [favorites,setFavorites] = useContext(FavoriteContext)

    // function handleClick(e){
    //     e.preventDefault()
    //     setFlip(!flip)
    // }
    
    const [favorites,setFavorites] = useContext(FavoriteContext)
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
    
    // console.log(top)

    return (
           <div>
                {/* {favorites.length === 0 ? <h1>None yet</h1>: <p>} */}
                {top.length===0 ? '' : 
                    <Data 
                        top={top} 
                        teams = {teams}
                        players = {players}
                        className='favorites-data'
                        />}
                <ul className="favorites">
                {favorites.length === 0 ? <h1>No favorites yet!</h1>:favorites.map((teamBet)=>{
                    return(
                    <Favorite
                        key={teamBet.id}
                        teamBet = {teamBet}
                        setTop={setTop}
                    />
                    )
                })}
            </ul>
           </div>
    )
}

export default Favorites;







// import React, { useContext } from "react";
// import { FavoriteContext } from "./App";
// import Favorite from "./Favorite";

// function Favorites(){

//     const [favorites,setFavorites] = useContext(FavoriteContext)

//     return (
//         <div>
//             <ul className="favorites">
//                 {favorites.length === 0 ? <h1>No favorites yet!</h1> : favorites.map((teamBet) => {
//                     return (
//                         <Favorite
//                             key={teamBet.id}
//                             teamBet={teamBet}
//                         />
//                     );
//                 })}
//             </ul>
//         </div>
//     )
// }

// export default Favorites;