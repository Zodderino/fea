import {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

export default function Notification({notification = {text: "", display: false}}) {
    const [displayNotification, setDisplayNotification] = useState(false);

    useEffect(() => {
        if (notification.display) {
            setDisplayNotification(true)
            setTimeout(() => {
                notification.display = false;
                setDisplayNotification(false)
            }, 5000)
        }
    }, [notification, notification.display]);

    return (
        <Snackbar open={displayNotification}
                  anchorOrigin={{vertical: "top", horizontal: "right"}}>
            <Alert severity="error" sx={{width: "100%"}}>{notification.text}</Alert>
        </Snackbar>
    )
}