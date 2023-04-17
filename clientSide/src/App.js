import './App.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';
import { css } from '@emotion/react';
import { fontSize } from '@mui/system';

function App() {
    const navigate = useNavigate();

    const handleSignin = (e) => {
        e.preventDefault();
        navigate("/signin");
    }

    const handleSignup = (e) => {
        e.preventDefault();
        navigate("/signup")
    }


    return (


        <div className="App">
            <div className="section-a" style={{
                backgroundImage: `url('/bg.jpg')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
                <div className="logo">
                    <span>SMART FARM</span><span id='dot'>.</span>
                </div>
                <div className="content">
                    <div className="intro-box">
                        <div className="intro">
                            WELCOME TO SMART FARM <br />
                            <div className="text-wel">
                                <h1 id='quote'>
                                    " We Predict Future "
                                </h1>
                            </div>
                        </div>
                        <span className='signin'>
                            <Button
                                id='btn'
                                variant='contained'
                                onClick={handleSignin}
                                color='success'
                            >
                                Sign IN
                            </Button>
                        </span>
                        <span className="signup">
                            <Button
                                id='btn'
                                variant='contained'
                                onClick={handleSignup}
                                color='success'
                            >
                                Sign UP
                            </Button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
