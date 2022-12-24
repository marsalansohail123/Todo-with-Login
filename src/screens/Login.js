import React, { useState } from 'react'
import '../App.css'
import { Box, TextField } from '@mui/material'
import { Button } from '@mui/material'
import { LoginUser } from '../config/firebasemethod'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);

    let createNew = () => {
        navigate("/")
    }

    let login = () => {
        setLoader(true);
        LoginUser({
            email,
            password
        })
            .then((success) => {
                setLoader(false);
                console.log(success)
                navigate("/dashboard", {
                    state: success
                })
            })
            .catch((err) => {
                setLoader(false);
                alert(err);
            })
    }

    return (
        <div className='main'>
            <section className='section'>
                <h1 className='heading'>Login</h1>
                <Box className='input'>
                    <TextField label="Email" onChange={(e) => setEmail(e.target.value)} variant="filled" />
                </Box>
                <Box className='input'>
                    <TextField type='password' onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                </Box>

                {loader
                    ?
                    <Button variant="outlined">Loading...</Button>
                    :
                    <Button variant="outlined" onClick={login}>Login</Button>
                }
                <Box className='or'>
                    <p>OR</p>
                </Box>
                <Box>
                    <Button onClick={createNew} variant="contained" color="success">Create New Account</Button>
                </Box>
            </section>
        </div>
    )
}

export default Login
