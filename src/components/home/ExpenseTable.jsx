import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import * as expenseApi from "../../api/expense"
import {useCurrentUser} from "../../context/UserContext";
import * as timeUtil from "../../utils/time";

export default function ExpenseTable({startDate, endDate}) {
    const [data, setData] = useState([])
    const {currentUser} = useCurrentUser();


    useEffect(() => {
        async function fetchData() {
            const response = await expenseApi.getExpenseList({
                startDate: timeUtil.fromJSDateToISODate(startDate.toDate()),
                endDate: timeUtil.fromJSDateToISODate(endDate.toDate()),
                token: currentUser.token
            });

            if (response) {
                setData(response)
            }
        }

        fetchData()
    }, [startDate, endDate, currentUser.token]);

    return (
        <Table>
            <TableHead color="primary">
                <TableRow>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) => <TableRow key={index}>
                            <TableCell align="center">{item.expenseDate}</TableCell>
                            <TableCell align="center">{item.name}</TableCell>
                            <TableCell align="center">{item.category}</TableCell>
                            <TableCell align="center">{item.amount}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}