import React, { useState } from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    // const [user, setUser] = useState({
    //   name:'',
    //   username:'',
    //   email:'',
    //   password:'',

    // })

    const navigate = useNavigate();

    const statesAndDistricts = {
      "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", 
                         "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", 
                         "West Godavari", "YSR Kadapa"],
      "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Lower Subansiri", 
                            "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Lower Dibang Valley", 
                            "Dibang Valley", "Anjaw", "Lohit", "Changlang", "Tirap", "Longding"],
      "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
                "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", 
                "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", 
                "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", 
                "Udalguri", "West Karbi Anglong"],
      "Kerala": [ "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam",
                  "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur","Wayanad"]
    };

    // const handleRegister= () => {
    //   if(isFormValid){
    //      navigate("/")
    //   }
    // }

    // const checkPasswordMatch = () => {
    //    if(password === confirmPassword){
    //       setIsPasswordValid(true);
    //    }
    // }

    const [form, setForm] = useState({ 
        name: '',
        email: '',
        userState:'',
        district: '',
        city: '',
        pincode:'',
        username: '', 
        password: '', 
        confirmPassword: ''
      });
    
  

      const validateField = (name, value) => {
        let error = '';
    
        switch (name) {
          case 'name':
            if (!value.trim()) error = 'Name is required';
            break;
          case 'email':
            if (!value) error = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
              error = 'Invalid email format';
            break;
          case 'userState':
            if (!value) error = 'State is required';
            break;
          case 'district':
            if (!value) error = 'District is required';
            break;
          case 'city':
            if (!value.trim()) error = 'City is required';
            break;
          case 'pincode':
            if (!value) error = 'Pincode is required';
            else if (!/^\d{6}$/.test(value)) error = 'Pincode must be 6 digits';
            break;
          case 'username':
            if (!value.trim()) error = 'Username is required';
            break;
          case 'password':
            if (!value) error = 'Password is required';
            break;
          case 'confirmPassword':
            if (!value) error = 'Confirm your password';
            else if (value !== form.password) error = 'Passwords do not match';
            break;
          default:
            break;
          }

      setErrors(prev => ({ ...prev, [name]: error }));
      const updatedForm = { ...form, [name]: value };
      const hasErrors = Object.values({ ...errors, [name]: error }).some(Boolean);
      const allFilled = Object.values(updatedForm).every(val => val.trim() !== '');
      setIsFormValid(!hasErrors && allFilled);
      
    }  

      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        validateField(name, value);


        
      };
    
     

      // const handleStateChange = (event) => {
      //   const selectedState = event.target.value;
      //   setForm( (prev) => ({
      //     ...prev,
      //     userState: selectedState,
      //     district: "", // reset district when state changes
      //   }));
      // };

      const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setForm(prev => ({ 
          ...prev, 
          userState: selectedState, district: '' }));
        validateField('userState', selectedState);
      };
    
      // const handleDistrictChange = (event) => {
      //   setForm({ ...form, district: event.target.value });
      // };
      const handleDistrictChange = (e) => {
        const value = e.target.value;
        setForm(prev => ({ ...prev, district: value }));
        validateField('district', value);
      };

      const states = Object.keys(statesAndDistricts);
      const districts = form.userState ? statesAndDistricts[form.userState] : [];

      const handleSubmit = async (e) => {
        e.preventDefault();

        // axios.post('http://localhost:9000/api/users',{
        //   name:'',
        //   username:'',
        //   email:'',
        //   password:'',
        // })
        // const {name, value} = e.target;
        // setUser(prev => ( {...prev, [name]:value} ));

        // console.log('Sign up form submitted:', form);
        // if(isFormValid){
        //   navigate("/login");
        // }

         // Final validation check before submitting
    const hasErrors = Object.values(errors).some(Boolean);
    const allFilled = Object.values(form).every(val => val.trim() !== '');
    if (!allFilled || hasErrors) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      await axios.post('http://localhost:9000/api/users', {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        city: form.city,
        district: form.district,
        state: form.userState,
        pincode: form.pincode,
      });
      console.log('Sign up form submitted:', form);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
        
      };

  return (
    
    <Box
    sx={{
        backgroundImage: 'url("/user_login_background.png")',
        backgroundColor: 'blueviolet',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: '80px',
        padding: "80px"
      }}>

    
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '10px 30px',
          border: '2px solid #0D47A1',
        }}>
      <Container component="main" maxWidth="sm">
        
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={form.name}
              onChange={handleChange}
          
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />


              <Grid container spacing={2}>
          
              <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  name="userState"
                  value={form.userState}
                  onChange={handleStateChange}
                  margin="normal"
                  required
                  error={!!errors.userState}
                  helperText={errors.userState}
                >
                  <MenuItem value="">
                    <em>--Select--</em>
                  </MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
                <TextField
                  select
                  fullWidth
                  label="District"
                  name="district"
                  value={form.district}
                  onChange={handleDistrictChange}
                  margin="normal"
                  required
                  disabled={!form.userState}
                  error={!!errors.district}
                  helperText={errors.district}
                >
                  <MenuItem value="">
                    <em>--Select--</em>
                  </MenuItem>
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>   
  


            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              // autoFocus
              value={form.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="pincode"
              label="Pincode"
              name="pincode"
              autoComplete="pincode"
              // autoFocus
              value={form.pincode}
              onChange={handleChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              // autoFocus
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
              sx={{ mt: 3, mb: 2,
                bgcolor: 'primary.main',      // keep original color
                color: 'white',               // text color
                '&.Mui-disabled': {
                  bgcolor: 'primary.main',    // override disabled background
                  color: 'white',             // override disabled text color
                  opacity: 0.7                // slight transparent
                }            

               }}

            >
              Sign up
            </Button>
            {/* {isFormValid &&
              <Link href="/" />} */}
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        </Box>
      </Box>
  )
}

export default RegisterForm