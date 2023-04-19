import React from "react";
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
  function avg(array){
    let count = 0
    for (let i=0;i<array.length;i++){
      count += array[i]
    }
    return parseInt(count/array.length)
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
    
  let playerAttributesHome = {
    'name': [],
    'team': [],
    'points': [],
    'rebounds': [],
    'assists': [],
    'threes': [],
    'date': []
  }
  let playerAttributesAway = {
    'name': [],
    'team': [],
    'points': [],
    'rebounds': [],
    'assists': [],
    'threes': [],
    'date': []
  }

  for (let i=0; i<players.length;i++){
    if (top.home_team.toUpperCase() === players[i]['team']){  
      playerAttributesHome['points'].push(players[i]['points'])
      playerAttributesHome.team.push(players[i]['team'])
      playerAttributesHome.assists.push(players[i]['assists'])
      playerAttributesHome.rebounds.push(players[i]['rebounds'])
      playerAttributesHome.threes.push(players[i]['threes'])
      let date = new Date(players[i]['date']).toDateString()
      playerAttributesHome.date.push(date)
      playerAttributesHome.name.push(players[i]['name'])
    }
    else if (top.away_team.toUpperCase() === players[i]['team']){  
      playerAttributesAway['points'].push(players[i]['points'])
      playerAttributesAway.team.push(players[i]['team'])
      playerAttributesAway.assists.push(players[i]['assists'])
      playerAttributesAway.rebounds.push(players[i]['rebounds'])
      playerAttributesAway.threes.push(players[i]['threes'])
      let date = new Date(players[i]['date']).toDateString()
      playerAttributesAway.date.push(date)
      playerAttributesAway.name.push(players[i]['name'])
    }
  }

///////////////////////////////////////////////////////////////////
  // DATA FOR CHARTS
  const homeLabels = homeTeam.date
  const awayLabels = awayTeam.date
  const optionsHome = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: `Points per game, last ${homeTeam.points.length} games. AVG: ${avg(homeTeam.points)}`,
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
        text: `Points per game, last ${awayTeam.points.length} games. AVG: ${avg(awayTeam.points)}`,
        },
    },
  };
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
          'rgba(255, 99, 132, 0.5)',
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
          'rgba(54, 162, 235, 0.5)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  
  const reboundsHome = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: `Rebounds per game, last ${homeTeam.team_rebounds.length} games. AVG: ${avg(homeTeam.team_rebounds)}`,
        },
    },
  };
  const reboundsAway = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: `Rebounds per game, last ${awayTeam.team_rebounds.length} games. AVG: ${avg(awayTeam.team_rebounds)}`,
        },
    },
  };
  const reboundsDataAway = {
    labels: homeLabels,
    datasets: [
      {
        label: `${top.home_team}`,
        // data: homeTeam.points.map((point)=>{
        //   return point
        // }),
        data: homeTeam.team_rebounds,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.5)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  const reboundsDataHome = {
    labels: awayLabels,
    datasets: [
      {
        label: `${top.away_team}`,
        // data: homeTeam.points.map((point)=>{
        //   return point
        // }),
        data: awayTeam.team_rebounds,
        backgroundColor: [
          // 'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.5)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  
  const assistsHome = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: `Assists per game, last ${homeTeam.team_assists.length} games. AVG: ${avg(homeTeam.team_assists)}`,
        },
    },
  };
  const assistsAway = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: `Assists per game, last ${awayTeam.team_assists.length} games. AVG: ${avg(awayTeam.team_assists)}`,
        },
    },
  };
  const assistsDataHome = {
    labels: homeLabels,
    datasets: [
      {
        label: `${top.home_team}`,
        // data: homeTeam.points.map((point)=>{
        //   return point
        // }),
        data: homeTeam.team_assists,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.5)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  const assistsDataAway = {
    labels: awayLabels,
    datasets: [
      {
        label: `${top.away_team}`,
        // data: homeTeam.points.map((point)=>{
        //   return point
        // }),
        data: awayTeam.team_assists,
        backgroundColor: [
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.5)'
        ],
      },
    ],
  };


  const optionsHomeStacked = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${homeTeam.team_name} last ${homeTeam.points.length} games.`,
        },
    },
  };
  const optionsAwayStacked = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: `${awayTeam.team_name} last ${awayTeam.points.length} games.`,
        },
    },
  };
  const homeDataStacked = {
    labels: homeLabels,
    datasets: [
      {
        label: `Points`,
        data: homeTeam.points,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
      {
        label: `Rebounds`,
        data: homeTeam.team_rebounds,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
      {
        label: `Assists`,
        data: homeTeam.team_assists,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.5)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  const awayDataStacked = {
    labels: awayLabels,
    datasets: [
      {
        label: `Points`,
        data: awayTeam.points,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.5)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
      {
        label: `Rebounds`,
        data: awayTeam.team_rebounds,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.5)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.5)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
      {
        label: `Assists`,
        data: awayTeam.team_assists,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.5)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.5)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  
  // END OF DATA
//////////////////////////////////////////////////////////////
    
  return (
      <div
          className="card__title-back"
          // style={{"position": "relative", "height":"40vh", "width":"80vw"}}
            >
            <h1>
            <span id = 'data-teams' style={{fontFamily:'Helvetica Bold'}}>{top.away_team} vs. {top.home_team}</span>
            </h1>
            <div className="charts-row1">
              <Bar
                width={100}
                height={50}
                options={optionsHomeStacked} 
                data={homeDataStacked} 
              />
              <Bar 
                width={100}
                height={50}
                options={optionsAwayStacked} 
                data={awayDataStacked} 
              />
            </div>
            {/* <div className="charts-row2">
              <Bar
                width={100}
                height={50}
                options={reboundsHome} 
                data={reboundsDataHome} 
              />
              <Bar 
                width={100}
                height={50}
                options={reboundsAway} 
                data={reboundsDataAway} 
              />
            </div> */}
        </div>
  )
}

export default Data;