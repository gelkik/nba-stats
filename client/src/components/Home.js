import Bet from "./Bet";
import Box from '@mui/material/Box';

function Home({ teamBets,user }) {
  
    // if (user) {
    //   return <h1 className="home">Welcome, {user.username}!</h1>;
    // } else {
    //   return <h1 className="home">Please Login or Sign Up</h1>;
    // }
    // if (user) {
    //   return (
    //   <h1 className="home">Welcome, {user.username}!</h1>
    //   )
    // } else {
    //   return (
        
    //     <h1 className="home">Please Login or Sign Up</h1>
      
    //   );
    // }
  return (
    <div className="home-text">
          {/* {user ? 
          <h4 className="home">Welcome, {user.username}!</h4>
          : 
          <h4 className="home">Please Login or Sign Up</h4>
          } */}
          Welcome to <span style={{ fontSize: '120%', fontWeight: 'bold',color:'orange' }}>DataDunk</span>! Here, you can access 
          NBA data that will optimize your betting experience. We do not tell you what bets to make, nor are we a betting site. 
          We're all about data-driven decision making; collecting data from each team and their respective players, and displaying them
          simply and effectively, right at the palm of your hands, so that you can have a better strategy before making any
          decisions.
          <h4>
            Whether it's head-to-head, spreads, or player props, we have you covered.
          </h4>
      
          <h4 className="home-text-rows">Login or Sign Up for a better experience!</h4>
          {teamBets.length !== 0 ? 
          <>
          <h4 className="home-text-rows">Below is the upcoming matchup. Click on the <a href="/bets" style={{color: 'white',}}>Bets</a> tab for more!</h4>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Bet className='home-bet'teamBet={teamBets[0]} user={user}/>
          </Box>

          </>
          
          : <h4>
            NBA season is over. Tune in before opening day in the fall!
            </h4>}
        </div>
  )
}
export default Home;

