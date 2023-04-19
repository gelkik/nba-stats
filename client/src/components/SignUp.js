import React, { useState } from "react";
import { TextField,Box,Button } from '@mui/material'
import { useNavigate  } from "react-router-dom";

function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => 
        setUser(user.username));
      }
      navigate("/bets")
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Box
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <form 
          className = 'login-form' 
          onSubmit={handleSubmit} 
          // contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}
        >
          <br />
          <br />
          <h1 style={{fontFamily:'monospace', fontSize: '40px'}}>Sign Up!</h1>
          <TextField 
            InputLabelProps={{ shrink: true }} 
            margin="dense"
            style = {{width: '30%'}}
            id="username" 
            label="Username" 
            variant="outlined" 
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <br />
          <TextField 
            type='password'
            InputLabelProps={{ shrink: true }} 
            margin="dense"
            style = {{width: '30%'}}
            id="password" 
            label="Password" 
            variant="outlined" 
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br />
          <TextField 
            type='password'
            InputLabelProps={{ shrink: true }} 
            margin="dense"
            style = {{width: '30%'}}
            id="password_confirmation" 
            label="Password Confirmation" 
            variant="outlined" 
            autoComplete="current-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
          <Button 
            type='submit'
            variant="outlined"
            margin="dense"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default SignUp;