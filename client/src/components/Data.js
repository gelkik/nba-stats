import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar,Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


function Data({ top, teams, players }){
  
  // let bettingOptions = {
  //   'Teams': ['H2H','SPREADS','TOTALS']
  // }
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                            // PLAYERS
  let awayPlayers = {
    'name': [],
    "stats":[]
  }
  let homePlayers = {
    'name': [],
    "stats":[]
  }

  for (let i=0; i<players.length;i++){
    if (players[i]['team'].toUpperCase() === top.away_team.toUpperCase()){
      let temp = []
      if (awayPlayers.name.includes(players[i]['name']) === true){
        for (let j=0; j<awayPlayers.name.length;j++){
          if (awayPlayers.stats[j]['name']===players[i]['name']){
            awayPlayers.stats[j].points.push(players[i]['points'])
            awayPlayers.stats[j].assists.push(players[i]['assists'])
            awayPlayers.stats[j].rebounds.push(players[i]['rebounds'])
            awayPlayers.stats[j].threes.push(players[i]['threes'])
            let date = new Date(players[i]['date']).toDateString()
            awayPlayers.stats[j].date.push(date)
          }
        }
      }
      else{
        temp.points = []
        temp.assists = []
        temp.rebounds = []
        temp.threes = []
        temp.date = []
        temp.name = players[i]['name']
        temp.points.push(players[i]['points'])
        temp.assists.push(players[i]['assists'])
        temp.rebounds.push(players[i]['rebounds'])
        temp.threes.push(players[i]['threes'])
        let date = new Date(players[i]['date']).toDateString()
        temp.date.push(date)
        awayPlayers.name.push(players[i]['name'])
        awayPlayers.stats.push(temp)
      }
    }
  }

  for (let i=0; i<players.length;i++){
    if (players[i]['team'].toUpperCase() === top.home_team.toUpperCase()){
      let temp = []
      if (homePlayers.name.includes(players[i]['name']) === true){
        for (let j=0; j<homePlayers.name.length;j++){
          if (homePlayers.stats[j]['name']===players[i]['name']){
            homePlayers.stats[j].points.push(players[i]['points'])
            homePlayers.stats[j].assists.push(players[i]['assists'])
            homePlayers.stats[j].rebounds.push(players[i]['rebounds'])
            homePlayers.stats[j].threes.push(players[i]['threes'])
            let date = new Date(players[i]['date']).toDateString()
            homePlayers.stats[j].date.push(date)
          }
        }
      }
      else{
        temp.points = []
        temp.assists = []
        temp.rebounds = []
        temp.threes = []
        temp.date = []
        temp.name = players[i]['name']
        temp.points.push(players[i]['points'])
        temp.assists.push(players[i]['assists'])
        temp.rebounds.push(players[i]['rebounds'])
        temp.threes.push(players[i]['threes'])
        let date = new Date(players[i]['date']).toDateString()
        temp.date.push(date)
        homePlayers.name.push(players[i]['name'])
        homePlayers.stats.push(temp)
      }
    }
  }

  for (let i=0;i<awayPlayers.stats.length;i++){
    if (avg(awayPlayers.stats[i].points) < 15 || awayPlayers.stats[i].points.length < 3){
      delete awayPlayers.stats[i]
    }
  }
  for (let i=0;i<homePlayers.stats.length;i++){
    if (avg(homePlayers.stats[i].points) < 15 || homePlayers.stats[i].points.length < 3){
      delete homePlayers.stats[i]
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////
  // DATA FOR CHARTS
  const homeLabels = homeTeam.date
  const awayLabels = awayTeam.date
  const optionsHomeStacked = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
      }
      },
      y: {
        stacked: true,
        ticks: {
          color: "white",
          display: false
      }
      },
    },
    plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white'
            }
        },
        title: {
          display: true,
          color: 'white',
          text: `${top.home_team} Stats last ${homeTeam.points.length} games.`,
        },
    },
  };
  const optionsAwayStacked = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
      }
      },
      y: {
        stacked: true,
        ticks: {
          color: "white",
          display: false
      }
      },
    },
    plugins: {
        legend: {
        position: 'top',
        labels: {
          color: 'white'
          }
        },
        title: {
          display: true,
          color: 'white',
          text: `${top.away_team} Stats last ${awayTeam.points.length} games.`,
        },
    },
  };
  const homeDataStacked = {
    labels: homeLabels,
    datasets: [
      {
        label: `Assists`,
        data: homeTeam.team_assists,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          'rgba(200, 205, 86, 0.5)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
      {
        label: `Field Goals`,
        data: homeTeam.team_fgs,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.5)',
          'rgba(200, 192, 192, 0.5)',
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
          'rgba(200, 159, 64, 0.5)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
      {
        label: `Points`,
        data: homeTeam.points,
        backgroundColor: [
          'rgba(200, 99, 132, 0.5)',
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

  const awayDataStacked = {
    labels: awayLabels,
    datasets: [
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
      {
        label: `Field Goals`,
        data: awayTeam.team_fgs,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.5)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.5)',
          'rgba(201, 203, 207, 0.5)'
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
        label: `Points`,
        data: awayTeam.points,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          'rgba(, 192, 192, 0.5)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  };
  
  // const optionsAwayPlayer = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       stacked: true,
  //       ticks: {
  //         color: "white",
  //     }
  //     },
  //     y: {
  //       stacked: true,
  //       ticks: {
  //         color: "white",
  //         display: false
  //     }
  //     },
  //   },
  //   plugins: {
  //       legend: {
  //       position: 'top',
  //       labels: {
  //         color: 'white'
  //         }
  //       },
  //       title: {
  //         display: true,
  //         color: 'white',
  //         text: `${top.away_team} player points last ${awayTeam.points.length} games.`,
  //       },
  //   },
  // };
  // const optionsHomePlayer = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       stacked: true,
  //       ticks: {
  //         color: "white",
  //     }
  //     },
  //     y: {
  //       stacked: true,
  //       ticks: {
  //         color: "white",
  //         display: false
  //     }
  //     },
  //   },
  //   plugins: {
  //       legend: {
  //       position: 'top',
  //       labels: {
  //         color: 'white'
  //         }
  //       },
  //       title: {
  //         display: true,
  //         color: 'white',
  //         text: `${top.home_team} player points last ${homeTeam.points.length} games.`,
  //       },
  //   },
  // };
  // const awayDataPlayer = {
  //   labels: homeLabels,
  //   datasets: [
  //     {
  //       label: `${awayPlayers.stats[0].name}`,
  //       data: awayPlayers.stats[0].points,
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.5)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         'rgba(200, 205, 86, 0.5)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //     {
  //       label: `${awayPlayers.stats[1].name}`,
  //       data: awayPlayers.stats[1].points,
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.5)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         // 'rgba(255, 205, 86, 0.5)',
  //         'rgba(200, 192, 192, 0.5)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //     {
  //       label: `${awayPlayers.stats[2].name}`,
  //       data: awayPlayers.stats[2].points,
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.5)',
  //         'rgba(200, 159, 64, 0.5)',
  //         // 'rgba(255, 205, 86, 0.2)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //     {
  //       label: `${awayPlayers.stats[3].name}`,
  //       data: awayPlayers.stats[3].points,
  //       backgroundColor: [
  //         'rgba(200, 99, 132, 0.5)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         // 'rgba(255, 205, 86, 0.2)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //   ],
  // };
  // let dataHome = []
  // let dataHomePoint = []

  // for (let i=0;i<homePlayers.stats.length;i++){
  //   {
  //     label: `${homePlayers.stats[0].name}`,
  //     'data': homePlayers.stats[0].points,
  //     backgroundColor: 'rgba(200, 205, 86, 0.5)',
  //   }
  // }
  // console.log(homePlayers)
  // const homeDataPlayer = {
  //   labels: homeLabels,
  //   datasets: [
  //     {
  //       label: `${homePlayers.stats[0].name}`,
  //       data: homePlayers.stats[0].points,
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.5)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         'rgba(200, 205, 86, 0.5)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //     {
  //       label: `${homePlayers.stats[1].name}`,
  //       data: homePlayers.stats[1].points,
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.5)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         // 'rgba(255, 205, 86, 0.5)',
  //         'rgba(200, 192, 192, 0.5)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //     {
  //       label: `${homePlayers.stats[2].name}`,
  //       data: homePlayers.stats[2].points,
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.5)',
  //         'rgba(200, 159, 64, 0.5)',
  //         // 'rgba(255, 205, 86, 0.2)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //     {
  //       label: `${homePlayers.stats[3].name}`,
  //       data: homePlayers.stats[3].points,
  //       backgroundColor: [
  //         'rgba(200, 99, 132, 0.5)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         // 'rgba(255, 205, 86, 0.2)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         // 'rgba(153, 102, 255, 0.2)',
  //         // 'rgba(201, 203, 207, 0.2)'
  //       ],
  //     },
  //   ],
  // };
  



  // const optionsPlayerAway = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: `${top.away_team} Player Stats`,
  //     },
  //   },
  // };

  // const colors = ['rgba(255, 99, 132, 0.5)',
  //                 'rgba(255, 159, 64, 0.5)',
  //                 'rgba(255, 205, 86, 0.5)',
  //                 'rgba(55, 192, 192, 0.5)',
  //                 'rgba(54, 162, 235, 0.5)',
  //                 'rgba(153, 102, 255, 0.5)',
  //                 'rgba(201, 203, 207, 0.5)'
  //               ]

  // let dataPlayerAwayPointsDataset = [
  //   {
  //     label: '',
  //     data: [],
  //     borderColor: '',
  //     backgroundColor: '',
  //   }
  // ]
  // console.log(awayPlayers)
  // let aPP = awayPlayers.stats[0].date
  // const dataPlayerAway = {
  //   labels: aPP,
  //   datasets: [
  //     {
  //       label: `${awayPlayers.name[0]}`,
  //       data: awayPlayers.stats[0].points,
  //       borderColor: colors[0],
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: `${awayPlayers.name[1]}`,
  //       data: awayPlayers.stats[1].points,
  //       borderColor: colors[1],
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //     {
  //       label: `${awayPlayers.name[2]}`,
  //       data: awayPlayers.stats[2].points,
  //       borderColor: colors[2],
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  // END OF DATA
//////////////////////////////////////////////////////////////
    
  return (
      <div
          className="card__title-back"
          // style={{"position": "relative", "height":"40vh", "width":"80vw"}}
            >
            <h1 id = 'data-teams' style={{fontFamily:'monospace',
                    display: 'flex',  justifyContent:'center', alignItems:'center', fontSize:'2.5vw', color: 'orange'
                    }}>{top.away_team} vs. {top.home_team}
            </h1>
            <div className="charts-row1">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxHeight="40vw"
                maxWidth='40vw'
                marginLeft='20vw'
                
                // sx={{
                //   border: 1,
                //   borderRadius: '16px',
                //   color:"white", 
                //   backgroundColor:'black',
                //   width: '50%',
                //   justifyContent:"center",
                //   alignItems:"center",
                //   marginLeft: '25%',
                //   marginTop: '5vw'
                // }}
              >
              <Bar
                width='60%'
                height='50%'
                options={optionsHomeStacked} 
                data={homeDataStacked} 
              />
              <Bar 
                width='60%'
                height='50%'
                options={optionsAwayStacked} 
                data={awayDataStacked} 
              />
              </Box>
              </div>
              {/* <div className="charts-row2">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxHeight="40vw"
                maxWidth='40vw'
                marginLeft='20vw'
                marginBottom='40vw'
                
                // sx={{
                //   border: 1,
                //   borderRadius: '16px',
                //   color:"white", 
                //   backgroundColor:'black',
                //   width: '50%',
                //   justifyContent:"center",
                //   alignItems:"center",
                //   marginLeft: '25%',
                //   marginTop: '5vw'
                // }}
              >
              <Bar
                width='60%'
                height='50%'
                options={optionsHomePlayer} 
                data={homeDataPlayer} 
              />
              <Bar 
                width='60%'
                height='50%'
                options={optionsAwayPlayer} 
                data={awayDataPlayer} 
              />
              </Box>
              </div> */}
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