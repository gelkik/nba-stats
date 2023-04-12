import React, { useContext, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FavoriteContext } from "./App";
import Rating from '@mui/material/Rating';

function Bet({ teamBet }){

    const [flip,setFlip] = useState(false)
    const [favorites,setFavorites] = useContext(FavoriteContext)

    function favBet(){
        if (favorites.includes(teamBet.id) === false){
            setFavorites((favorites) => [{...favorites, teamBet}])
            console.log(favorites)
        }
    }

    function handleClick(e){
        e.preventDefault()
        setFlip(!flip)
    }
    return (
            <ReactCardFlip isFlipped={flip}
                className='card-container' 
                flipDirection="horizontal">
                    <div
                    className="card__title">
                            <Rating
                                name="simple-controlled"
                                value={favorites.includes(teamBet.id)? 1:0}
                                max={1}
                                onClick={favBet}
                            />
                        <div className="card__title-front">
                        {teamBet.away_team} vs. {teamBet.home_team}
                        {teamBet.bookmakers[0].markets.map((market)=>{
                            return (<p 
                                className="card__text"
                            >
                                {market.key.toUpperCase()}: {market.outcomes.map((outcomes)=>{
                                return (
                                    <>
                                    <p className="outcomes-name">{outcomes.name}:</p>
                                    {outcomes.point != null ? <p className="outcome-points">Points: {outcomes.point}</p>: <p></p> }    
                                    <p className="outcome-odds">Odds: {(outcomes.price) < 2 ? `-${Math.ceil((1/(outcomes.price-1))*100)}`:`+${Math.floor((outcomes.price-1)/1*100)}`}</p>    
                                    </>
                                )
                            })}</p>)
                        })}
                        <button style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '20px',
                            background: '#f5d9fa',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            textAlign: 'center'
                        }} 
                        className="card_button"
                        onClick={handleClick}>
                            DATA</button>
                        </div>
                    </div>
                    <div
                        className="card__title-back"
                        >
                            {teamBet.away_team} vs. {teamBet.home_team}
                        {teamBet.bookmakers[0].markets.map((market)=>{
                            return (<p 
                                className="card__text"
                            >
                                {market.key.toUpperCase()}: {market.outcomes.map((outcomes)=>{
                                return (
                                    <>
                                    <p className="outcomes-name">{outcomes.name}:</p>
                                    {outcomes.point != null ? <p className="outcome-points">Points: {outcomes.point}</p>: <p></p> }    
                                    <p className="outcome-odds">Odds: {(outcomes.price) < 2 ? `-${Math.ceil((1/(outcomes.price-1))*100)}`:`+${Math.floor((outcomes.price-1)/1*100)}`}</p>    
                                    </>
                                )
                            })}</p>)
                        })}
                        
                        <button style={{
                        width: '150px',
                        padding: '10px',
                        fontSize: '20px',
                        background: '#f5d9fa',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        textAlign: 'center'
                        }} 
                        className="card_button"
                        onClick={handleClick}>
                            ODDS</button>
                    </div>
            </ReactCardFlip>
    )
}

export default Bet;