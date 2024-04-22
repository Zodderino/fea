import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

export default function ExpenseTable(props) {
    // This will be from api
    const data = [
        {
            "time": "2023-08-15T15:00:10.778Z",
            "name": "Shell Fuel",
            "category": "Fuel",
            "amount": 297.02
        },
        {
            "time": "2023-01-25T02:24:38.453Z",
            "name": "Shell Grocery",
            "category": "Grocery",
            "amount": 2572.66
        },
        {
            "time": "2023-07-03T06:49:00.670Z",
            "name": "METU Education",
            "category": "Education",
            "amount": 6603.44
        }
    ]

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
                            <TableCell align="center">{item.time}</TableCell>
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