import React, {useState} from 'react';
import {useCurrentUser} from "../../context/UserContext";
import * as userApi from "../../api/user"
import {useNavigate} from "react-router-dom";
import Notification from "../notification/Notification";
import {Container, TextField, Button, Link} from "@mui/material";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [notification, setNotification] = useState({text: "", display: false});

    const {login} = useCurrentUser()

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const submitLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await userApi.login({username, password})
            login({username, token: response.token});
            navigate("/");
        } catch (err) {
            setNotification({text: err.response.data.message, display: true})
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

            <Button onClick={submitLogin} variant="contained" sx={marginBottom}>Sign in</Button>

            <Container item className="text-center">
                Not a member? <Link href="/register">Register</Link>
            </Container>
        </Container>
    );
}

export default LoginPage;