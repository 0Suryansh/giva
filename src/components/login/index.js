import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { toastStyle } from '../../utility/helper'
import {isValidEmail} from '../../utility/helper'

const theme = createTheme();

function SignIn() {
    let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email')==="" && data.get('password')===""){
      toast.error('Please Enter email and Password to proceed',{...toastStyle.error});
  }
  else if(data.get('email')===""){
      toast.error('Please Enter email to proceed',{...toastStyle.error});
  }else if(data.get('password')===""){
      toast.error('Please Enter password to proceed',{...toastStyle.error});
  }else if(data.get('password').length<6){
      toast.error('Password must be 6 character long',{...toastStyle.error});
  }else if(!isValidEmail(data.get('email'))){
      toast.error('Entered email is invalid',{...toastStyle.error});
  }else{
      if(data.get('email')===localStorage.getItem("email_id") && data.get('password')===localStorage.getItem("password",data.get("password"))){
        navigate('/post')
        toast.success('Successuly Logged In',{...toastStyle.success});
      }else{
        toast.error('Entered Credential Do not match',{...toastStyle.error});
      }
  }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link align="center" onClick={(()=>{
                    navigate('/')
                  })} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn