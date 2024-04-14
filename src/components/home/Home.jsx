import {MDBCol, MDBContainer, MDBFile, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {useCurrentUser} from "../../context/UserContext";

export default function Home() {
    const {currentUser} = useCurrentUser()

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBRow className="justify-content-center align-items-center p-3">
                <MDBTypography tag='h3' className="text-center">
                    Welcome, {currentUser.username}
                </MDBTypography>
            </MDBRow>
            <MDBRow className="justify-content-center align-items-center p-3">
                You may upload your financial expense
            </MDBRow>
            <MDBRow className="justify-content-center align-items-center p-3">
                <MDBCol size="8">
                    <MDBFile/>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}