import React, { useState } from 'react';
import '../App.css';
import { Box, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Signupuser } from '../config/firebasemethod';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [loader, setLoader] = useState(false);

    const signUp = () => {
        setLoader(true);
        Signupuser({ email, password, userName })
            .then((success) => {
                // Signed in 
                alert(success)
                navigate("/login")
                setLoader(false);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
                setLoader(false);
            });
    }

    return (
        <div className='main'>
            <section className='section'>
                <h1 className='heading'>Signup</h1>
                <Box className='input'>
                    <TextField onChange={(e) => setUserName(e.target.value)} label="User Name" variant="filled" />
                </Box>
                <Box className='input'>
                    <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                </Box>
                <Box className='input'>
                    <TextField type='password' onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                </Box>
                <Box className='para'>
                    <p>Already have an Account, Please <Link to='/login'>Login</Link></p>
                </Box>
                {loader
                    ?
                    <Button variant="outlined">Loading...</Button>
                    :
                    <Button variant="outlined" onClick={signUp}>Signup</Button>
                }
            </section>
        </div>
    )
}

export default Signup
