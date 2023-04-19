import React, { useContext, useState,useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { FavoriteContext } from "./App";
import Rating from '@mui/material/Rating';
import * as moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  


function Bet({ teamBet, user }){

    const [flip,setFlip] = useState(false)
    const [favorites,setFavorites] = useContext(FavoriteContext)
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(true);
    };
    const onLeave = () => {
        setHover(false);
    };
    // console.log(favorites.id)
    function favBet(){
        if (user){
            if (!favorites.includes(teamBet)){
                setFavorites([...favorites,teamBet])
                // console.log(favorites)
            }
            // fetch("/favorite", {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ 
            //         "favorite": favorites.id,
            //      }),
            //   })
            // .then(r=>r.json())
            // .then(data=>{
            //     console.log(data)
            // })
        }
    }
    
    // function handleClick(e){
    //     e.preventDefault()
    //     setFlip(!flip)
    // }
    let date = new Date(teamBet.commence_time).toLocaleString();
    // let date = new Date(teamBet.commence_time);
    let formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

    // useEffect(()=>{
    //     fetch('/bets',{
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //         body: JSON.stringify({
    //             "bet_name": `${teamBet.away_team} vs. ${teamBet.home_team}`,
    //             "bet_date": formattedDate,
    //         })
    //     })
    //     .then(r=>r.json())
    //     .then(data=>{
    //         console.log(data)
    //     })
    // },[])

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
                            onClick={favBet}
                            onMouseEnter={onHover}
                            onMouseLeave={onLeave}
                        />
                            <CardActionArea>
                            <CardContent
                            >
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
                    <span style={{"font-family":"Georgia, serif"}}>{hover ? "Favorite" : ''}</span>

                    </div>
    )
}

export default Bet;