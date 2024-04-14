import React, {useState} from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import {useCurrentUser} from "../../context/UserContext";

import * as userApi from "../../api/user"
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {login} = useCurrentUser()

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const submitRegister = async (e) => {
        e.preventDefault()
        const response = await userApi.signup({username, password})

        if (response) {
            login({username, token: response.token});
            navigate("/");
        }
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput value={username} onChange={onUsernameChange} wrapperClass='mb-4' label='Username' id='form1'
                      type='email'/>
            <MDBInput value={password} onChange={onPasswordChange} wrapperClass='mb-4' label='Password' id='form2'
                      type='password'/>

            <MDBBtn onClick={submitRegister} className="mb-4">Register</MDBBtn>

            <div className="text-center">
                <p>Already a member? <a href="/login">Login</a></p>
                <p>or sign up with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>

                </div>
            </div>
        </MDBContainer>
    );
}