import {useCurrentUser} from "../context/UserContext";
import {Navigate, Outlet} from "react-router-dom";

export default function PrivateRoute() {
    const {currentUser} = useCurrentUser()
    return currentUser.username ? <Outlet/> : <Navigate to='/login'/>
}