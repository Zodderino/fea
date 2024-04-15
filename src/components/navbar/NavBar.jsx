import {MDBContainer, MDBNavbar, MDBNavbarLink} from "mdb-react-ui-kit";
import {useCurrentUser} from "../../context/UserContext";

export default function NavBar() {
    const {logout} = useCurrentUser()

    return (
        <MDBNavbar light bgColor="light">
            <MDBContainer fluid className="justify-content-end">
                <MDBNavbarLink onClick={logout} className="pe-3">
                    Logout
                </MDBNavbarLink>
            </MDBContainer>

        </MDBNavbar>
    )
}