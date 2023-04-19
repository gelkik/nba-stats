import React, { useContext, useState } from "react";
import { FavoriteContext } from "./App";
import Rating from '@mui/material/Rating';
import * as moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function Favorite({ teamBet,setTop }){

    // const [flip,setFlip] = useState(false)
    const [favorites,setFavorites] = useContext(FavoriteContext)

    function removeFav(){
        let index = favorites.indexOf(teamBet)
        setFavorites([
            ...favorites.slice(0, index),
            ...favorites.slice(index + 1, favorites.length)
          ])
    }
    let date = new Date(teamBet.commence_time).toLocaleString();
    let formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

    let away_image = teamBet.away_team.toLowerCase()
    let home_image = teamBet.home_team.toLowerCase()
    
    return (
        <div
        className="card__title">
        <Card sx={{ maxWidth: 300 }}>
            <Rating
                name="simple-controlled"
                value={favorites.includes(teamBet)? 1:0}
                max={1}
                onClick={removeFav}
            />
                <CardActionArea
                    onClick={()=>setTop(teamBet)}
                >
                    <CardContent>
                        <Typography 
                            sx={{textAlign: 'center', fontWeight: '750'}}
                            className = 'card-title-date' 
                            gutterBottom 
                            variant="h5" 
                            component="div">
                            {date}
                        </Typography>
                        <Typography 
                            sx={{textAlign: 'center', fontWeight: '750'}}
                            className = 'card-title-teams' 
                            gutterBottom 
                            variant="h5" 
                            component="div">
                            {teamBet.away_team} vs. {teamBet.home_team}
                        </Typography>
                        {/* <CardMedia
                            component="img"
                            height="300"
                            image={require(`../NBA_Logos/${away_image}.png`)}
                            alt={away_image}
                        /> */}
                        <img src={require(`../NBA_Logos/${away_image}.png`)} alt={away_image}/>
                        <img src={require(`../NBA_Logos/${home_image}.png`)} alt={home_image}/>
                        <Typography>
                        <div className="card__title-front">
                            {teamBet.bookmakers[0].markets.map((market)=>{
                                return (<p 
                                    className="card__text"
                                >
                                    <Box
                                        sx={{
                                        boxShadow: 0,
                                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                        color: (theme) =>
                                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                        p: 1,
                                        m: 1,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        fontSize: '1rem',
                                        fontWeight: '700'
                                    }}
                                    >
                                    <span style={{'fontSize':'20px', 'fontWeight':'800'}}>{market.key.toUpperCase()}</span> 
                                    {market.outcomes.map((outcomes)=>{
                                    return (
                                        <>
                                        <p className="outcomes-name">{outcomes.name}:</p>
                                        {outcomes.point != null ? <p className="outcome-points">Points: {outcomes.point > 0 ? `+${outcomes.point}`: outcomes.point}</p>: <p></p> }    
                                        <p className="outcome-odds">Odds: <span style={{"color":"green"}}>{(outcomes.price) < 2 ? `-${Math.ceil((1/(outcomes.price-1))*100)}`:`+${Math.floor((outcomes.price-1)/1*100)}`}</span></p>    
                                        </>
                                    )
                                })}</Box></p>)
                            })}
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}

export default Favorite;





// import React, { useState } from "react";
// import ReactCardFlip from "react-card-flip";
// import Rating from '@mui/material/Rating';

// function Favorite({ teamBet }){

//     const [flip,setFlip] = useState(false)

//     function handleClick(e){
//         e.preventDefault()
//         setFlip(!flip)
//     }

//     return (
//         <ReactCardFlip isFlipped={flip} className='card-container' flipDirection="horizontal">
//             <div className="cardtitle">
//                 <Rating name="simple-controlled" max={1} />
//                 <div className="cardtitle-front">
//                     {teamBet.away_team} vs. {teamBet.home_team}
//                     {teamBet.bookmakers[0].markets.map((market) => {
//                         return (
//                             <p className="cardtext">
//                                 {market.key.toUpperCase()}: {market.outcomes.map((outcomes) => {
//                                     return (
//                                         <React.Fragment key={outcomes.name}>
//                                             <p className="outcomes-name">{outcomes.name}:</p>
//                                             {outcomes.point != null ? (
//                                                 <p className="outcome-points">Points: {outcomes.point}</p>
//                                             ) : null}
//                                             <p className="outcome-odds">
//                                                 Odds: {(outcomes.price) < 2 ? `-${Math.ceil((1/(outcomes.price-1))*100)}`:`+${Math.floor((outcomes.price-1)/1*100)}`}
//                                             </p>
//                                         </React.Fragment>
//                                     );
//                                 })}
//                             </p>
//                         );
//                     })}
//                     <button 
//                         style={{
//                             width: '150px',
//                             padding: '10px',
//                             fontSize: '20px',
//                             background: '#f5d9fa',
//                             fontWeight: 'bold',
//                             borderRadius: '5px',
//                             textAlign: 'center'
//                         }} 
//                         className="card_button"
//                         onClick={handleClick}
//                     >
//                         DATA
//                     </button>
//                 </div>
//             </div>
//             <div className="cardtitle-back">
//                 {teamBet.away_team} vs. {teamBet.home_team}
//                 <button 
//                     style={{
//                         width: '150px',
//                         padding: '10px',
//                         fontSize: '20px',
//                         background: '#f5d9fa',
//                         fontWeight: 'bold',
//                         borderRadius: '5px',
//                         textAlign: 'center'
//                     }} 
//                     className="card_button"
//                     onClick={handleClick}
//                 >
//                     ODDS
//                 </button>
//             </div>
//         </ReactCardFlip>
//     );
// }

// export default Favorite;