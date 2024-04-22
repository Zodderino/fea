import {useCurrentUser} from "../../context/UserContext";
import {Box, AppBar, Toolbar, Button} from "@mui/material";

export default function NavBar() {
    const {logout} = useCurrentUser()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="primary">
                <Toolbar sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}