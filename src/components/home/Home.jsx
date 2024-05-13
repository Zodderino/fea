import {useCurrentUser} from "../../context/UserContext";
import NavBar from "../navbar/NavBar";
import ExpenseTable from "./ExpenseTable";
import PieChart from "./PieChart";
import CombinedBarLine from "./CombinedBarLine";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import * as timeUtil from "../../utils/time";
import dayjs from "dayjs";
import { Container, Typography} from "@mui/material";
import FileUpload from "./FileUpload";
import {useState} from "react";

export default function Home() {
    const {currentUser} = useCurrentUser()
    const rowStyle = {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        mb: 3
    }

    const [startDate, setStartDate] = useState(dayjs(timeUtil.lastWeekTime().toISODate()));
    const [endDate, setEndDate] = useState(dayjs(timeUtil.todayTime().toISODate()))

    const onStartDateChange = (event) => {
        setStartDate(event)
    }

    const onEndDateChange = (event) => {
        setEndDate(event)
    }

    return (
        <>
            <NavBar/>
            <Container maxWidth="md" sx={{mt: 15}}>
                <Container item sx={rowStyle}>
                    <Typography variant='h4'>
                        Welcome, {currentUser.username}
                    </Typography>
                </Container>
                <Container item sx={rowStyle}>
                    You may upload your financial expense
                </Container>
                <Container sx={rowStyle}>
                    <FileUpload />
                </Container>
                <Container sx={{...rowStyle, flexDirection: "column", textAlign: "center"}}>
                    <Container sx={{mb: 4, mt: 5}}>
                        <Typography variant='h4'>
                            Your previous expenses
                        </Typography>
                    </Container>
                    <Container item sx={rowStyle}>
                        <Container item>
                            <DatePicker label="Start date" value={startDate} onChange={onStartDateChange} />
                        </Container>
                        <Container>
                            <DatePicker label="End date" value={endDate} onChange={onEndDateChange} />
                        </Container>
                    </Container>
                    <Container>
                        <ExpenseTable startDate={startDate} endDate={endDate} />
                    </Container>
                </Container>
                <Container sx={{...rowStyle, flexDirection: "column"}}>
                    <Typography sx={{mb: 4}} variant='h5'>
                        Expenses as pie chart
                    </Typography>
                    <PieChart/>
                </Container>
                <Container sx={{...rowStyle, flexDirection: "column"}}>
                    <Typography sx={{mb: 4}} variant='h5'>
                        Expenses as bar chart
                    </Typography>
                    <CombinedBarLine/>
                </Container>
            </Container>
        </>

    )
}