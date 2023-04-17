import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });

        const response = await axios.post(`http://localhost:3002/api/signin`, { username, password });

        // TODO: Store the JWT token in local storage or a cookie
        console.log(response.data.token);
        if (response.data.success) {
            navigate("/dashboard");
        }
        if(response.data.message == "Invalid-username-password") {
            // console.log("Invalid-username-password");
            window.location.reload(false);
        }
        if(response.data.message == "Invalid-username") {
            console.log("Invalid-username-password");
            // window.location.reload(false);
        }
    };
    return (
        <>
        <script src="https://apis.google.com/js/platform.js"></script>
        <div className="section-b" style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"

        }}>
            <div className="logo">
                <span>SMART FARM</span><span id='dot'>.</span>
            </div>
            <div className="section-ba">

                <div className="white">

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
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        onChange={(e) => setUsername(e.target.value)}
                                        id="username"
                                        label="Username or Email"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        ref={userRef}
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
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
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
                                            <Link href="?" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href='/signup' variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    </>
    );
}