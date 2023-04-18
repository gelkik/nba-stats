import React, { useContext } from "react";
import { FavoriteContext } from "./App";
import Favorite from "./Favorite"
import Data from "./Data";

function Favorites({teamBets,user}){

    // const [flip,setFlip] = useState(false)
    // const [favorites,setFavorites] = useContext(FavoriteContext)

    // function handleClick(e){
    //     e.preventDefault()
    //     setFlip(!flip)
    // }
    
    const [favorites,setFavorites] = useContext(FavoriteContext)
    

    return (
           <div>
            <ul className="favorites">
                {/* {favorites.length === 0 ? <h1>None yet</h1>: <p>} */}
                {favorites.length === 0 ? <h1>No favorites yet!</h1>:favorites.map((teamBet)=>{
                    return(
                    <Favorite
                        key={teamBet.id}
                        teamBet = {teamBet}
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