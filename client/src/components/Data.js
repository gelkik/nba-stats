import React, {useContext,useState,useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


function Data({ top, teams, players }){
    
    let bettingOptions = {
        'Teams': ['H2H','SPREADS','TOTALS']
    }

    // let awayteam = {}
    let awayTeam = {
        'points': [],
        'team_assists': [],
        'team_fgs': [],
        'team_rebounds': [],
        'team_threes': [],
        'date': [],
        'team_name': []
    }
    let homeTeam = {
        'points': [],
        'team_assists': [],
        'team_fgs': [],
        'team_rebounds': [],
        'team_threes': [],
        'date': [],
        'team_name': []
    }

    for (let i=0; i<teams.length;i++){
        if (teams[i]['team_name'].toUpperCase() === top.away_team.toUpperCase()){
            awayTeam['points'].push(teams[i]['points'])
            awayTeam.team_assists.push(teams[i]['team_assists'])
            awayTeam.team_fgs.push(teams[i]['team_fgs'])
            awayTeam.team_rebounds.push(teams[i]['team_rebounds'])
            awayTeam.team_threes.push(teams[i]['team_threes'])
            let date = new Date(teams[i]['date']).toDateString()
            awayTeam.date.push(date)
            awayTeam.team_name.push(teams[i]['team_name'])
        }
        else if (teams[i]['team_name'].toUpperCase() === top.home_team.toUpperCase()){
            homeTeam.points.push(teams[i]['points'])
            homeTeam.team_assists.push(teams[i]['team_assists'])
            homeTeam.team_fgs.push(teams[i]['team_fgs'])
            homeTeam.team_rebounds.push(teams[i]['team_rebounds'])
            homeTeam.team_threes.push(teams[i]['team_threes'])
            let date = new Date(teams[i]['date']).toDateString()
            homeTeam.date.push(date)
            homeTeam.team_name.push(teams[i]['team_name'])
        }
    }
    
    const optionsHome = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: `Points scored last ${homeTeam.points.length} games`,
            },
        },
    };
    const optionsAway = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: `Points scored last ${awayTeam.points.length} games`,
            },
        },
    };
    const homeLabels = homeTeam.date
    const homeData = {
        labels: homeLabels,
        datasets: [
          {
            label: `${top.home_team}`,
            // data: homeTeam.points.map((point)=>{
            //   return point
            // }),
            data: homeTeam.points,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
              // 'rgba(255, 205, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(201, 203, 207, 0.2)'
            ],
          },
        ],
      };
    const awayLabels = awayTeam.date
    const awayData = {
        labels: awayLabels,
        datasets: [
          {
            label: `${top.away_team}`,
            // data: homeTeam.points.map((point)=>{
            //   return point
            // }),
            data: awayTeam.points,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(201, 203, 207, 0.2)'
            ],
          },
        ],
      };

    
    return (
        <div
            className="card__title-back"
            // style={{"position": "relative", "height":"40vh", "width":"80vw"}}
             >
              <h1>
              <span style={{fontFamily:'Helvetica Bold'}}>{top.away_team} vs. {top.home_team}</span>
              </h1>
              <div className="charts-row1">
                <Bar
                  width={100}
                  height={50}
                  className = "card__title-back-chart" 
                  options={optionsHome} 
                  data={homeData} 
                />
                <Bar 
                  width={100}
                  height={50}
                  className = "card__title-back-chart" 
                  options={optionsAway} 
                  data={awayData} 
                />
              </div>
              <div className="charts-row2">
                <Bar
                  width={100}
                  height={50}
                  className = "card__title-back-chart" 
                  options={optionsHome} 
                  data={homeData} 
                />
                <Bar 
                  width={100}
                  height={50}
                  className = "card__title-back-chart" 
                  options={optionsAway} 
                  data={awayData} 
                />
              </div>
              
          </div>
    )
}

export default Data;