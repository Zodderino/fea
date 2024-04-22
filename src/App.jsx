import './App.css';
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import Home from "./components/home/Home";
import PrivateRoute from "./utils/PrivateRoute";
import {CurrentUserProvider} from "./context/UserContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'


function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CurrentUserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PrivateRoute/>}>
                            <Route element={<Home/>} path="/" exact/>
                        </Route>
                        <Route element={<LoginPage/>} path="/login"/>
                        <Route element={<RegisterPage/>} path="/register"/>
                    </Routes>
                </BrowserRouter>
            </CurrentUserProvider>
        </LocalizationProvider>

    );
}

export default App;
