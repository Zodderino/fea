import { Button, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import * as expenseApi from "../../api/expense"
import Notification from "../notification/Notification";
import { useCurrentUser } from "../../context/UserContext";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileUpload({ fetchData }) {
    const [notification, setNotification] = useState({ text: "", display: false });
    const { currentUser } = useCurrentUser()

    const onFileChange = async (event) => {
        const file = event?.target?.files[0];

        try {
            await expenseApi.uploadExpense({ file, token: currentUser.token })
            await fetchData()
        } catch (err) {
            setNotification({ display: true, text: err?.response?.data?.message ?? "Internal Server Error" })
        }
    }

    return (
        <>
            <Notification notification={notification} />
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput onChange={onFileChange} type="file" />
            </Button>
        </>
    )
}