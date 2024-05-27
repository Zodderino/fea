import { useCurrentUser } from "../../context/UserContext";
import NavBar from "../navbar/NavBar";
import ExpenseTable from "./ExpenseTable";
import PieChart from "./PieChart";
import CombinedBarLine from "./CombinedBarLine";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as timeUtil from "../../utils/time";
import dayjs from "dayjs";
import { Container, Typography } from "@mui/material";
import FileUpload from "./FileUpload";
import { useEffect, useState } from "react";
import * as expenseApi from "../../api/expense"
import { HttpStatusCode } from "axios";

export default function Home() {
    const { currentUser, logout } = useCurrentUser()

    const rowStyle = {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        mb: 3
    }

    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(dayjs(timeUtil.lastWeekTime().toISODate()));
    const [endDate, setEndDate] = useState(dayjs(timeUtil.todayTime().toISODate()))

    async function fetchData() {
        try {
            const response = await expenseApi.getExpenseList({
                startDate: timeUtil.fromJSDateToISODate(startDate.toDate()),
                endDate: timeUtil.fromJSDateToISODate(endDate.toDate()),
                token: currentUser.token
            });

            if (response) {
                setData(response)
            }
        } catch (err) {
            if (err?.response?.status === HttpStatusCode.Forbidden) {
                logout()
            }
        } 
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, currentUser.token])

    const onStartDateChange = (event) => {
        setStartDate(event)
    }

    const onEndDateChange = (event) => {
        setEndDate(event)
    }

    return (
        <>
            <NavBar />
            <Container maxWidth="md" sx={{ mt: 15 }}>
                <Container item sx={rowStyle}>
                    <Typography variant='h4'>
                        Welcome, {currentUser.username}
                    </Typography>
                </Container>
                <Container item sx={rowStyle}>
                    You may upload your financial expense
                </Container>
                <Container sx={rowStyle}>
                    <FileUpload fetchData={fetchData} />
                </Container>
                <Container sx={{ ...rowStyle, flexDirection: "column", textAlign: "center" }}>
                    <Container sx={{ mb: 4, mt: 5 }}>
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
                    {data.length ? <Container>
                        <ExpenseTable data={data} />
                    </Container> : <Container>Sorry, no matching records found<br/>Please change time filters or upload expenses</Container>}
                </Container>
                {data.length ? <>
                    <Container sx={{ ...rowStyle, flexDirection: "column" }}>
                        <Typography sx={{ mb: 4 }} variant='h5'>
                            Expenses as pie chart
                        </Typography>
                        <PieChart data={data} />
                    </Container>
                    <Container sx={{ ...rowStyle, flexDirection: "column" }}>
                        <Typography sx={{ mb: 4 }} variant='h5'>
                            Expenses as bar chart
                        </Typography>
                        <CombinedBarLine data={data} />
                    </Container>
                </> : <></>}
            </Container>
        </>

    )
}