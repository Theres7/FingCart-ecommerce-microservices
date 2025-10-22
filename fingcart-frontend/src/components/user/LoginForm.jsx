import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [form, setForm] = useState({ 
    username: '', 
    password: '', 
    remember: false 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
//   const handleLogin = () => {
//   if (form.username === 'Mariya' && form.password === 'pass') {
    
//     localStorage.setItem('username', JSON.stringify(form.username));
//     setIsLoggedIn(true);
//     console.log(isLoggedIn);
//     navigate("/");
//     window.location.reload();
//   } else {
//     alert('Invalid credentials');
//   }
//  }

const handleLogin = async () => {

  try {
    // Send login request to backend
    const response = await axios.post('http://localhost:9000/api/auth/login', {
      username: form.username,
      password: form.password,
    });

    // Backend should respond with JWT token if credentials are valid
    const { token } = response.data;

    if (token) {
      // Save JWT to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('username', form.username);

      // Update state to logged in
      setIsLoggedIn(true);

      // Redirect to home page
      navigate("/");
      window.location.reload();
    } else {
      alert("Login failed: invalid credentials");
    }

  } catch (error) {
    console.error("Login error:", error);
    if (error.response && error.response.status === 401) {
      alert("Invalid username or password");
    } else {
      alert("Login failed. Please try again later.");
    }
  }
};


    

    



//  useEffect(() => {
//   axios.get('https://jsonplaceholder.typicode.com/posts')
//     .then(res => {
//       // setData(res.data);
//       localStorage.setItem("Posts", JSON.stringify(res.data));
//     })
//     .catch(err => {
//       console.error('Error fetching data:', err);
//     });
// }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', form);
    handleLogin();
  };


  return (
    // <ThemeProvider theme={theme}>

    <Box
    sx={{
        backgroundImage: 'url("/user_login_background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

    
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '30px 50px'
        }}>
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={form.remember}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        </Box>
      </Box>
   );
          
}


export default LoginForm;