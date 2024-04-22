import React, {useState} from 'react';
import {useCurrentUser} from "../../context/UserContext";

import * as userApi from "../../api/user"
import {useNavigate} from "react-router-dom";
import Notification from "../notification/Notification";
import {Container, TextField, Button, Link} from "@mui/material";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState({text: "", display: false});
    const navigate = useNavigate();

    const {login} = useCurrentUser()

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }
    const submitRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setNotification({text: "Password do not match", display: true})
            return
        }

        try {
            const response = await userApi.signup({username, password})
            login({username, token: response.token});
            navigate("/");
        } catch (err) {
            setNotification({text: err?.response?.data?.message, display: true})
        }
    }

    const marginBottom = {
        mb: 3
    }

    return (
        <Container maxWidth="sm" sx={{mt: 10, display: "flex", flexDirection: "column"}}>
            <Notification notification={notification} />

            <TextField size="small" value={username} onChange={onUsernameChange} sx={marginBottom} label='Username' id='form1'
                      type='email'/>
            <TextField size="small" value={password} onChange={onPasswordChange} sx={marginBottom} label='Password' id='form2'
                      type='password'/>
            <TextField size="small" value={confirmPassword} onChange={onConfirmPasswordChange} sx={marginBottom} label='Re-enter Password' id='form3'
                      type='password'/>

            <Button onClick={submitRegister} variant="contained" sx={marginBottom}>Register</Button>

            <Container item className="text-center">
                Already a member? <Link href="/login">Login</Link>
            </Container>
        </Container>
    );
}