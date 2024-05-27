import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function ExpenseTable({ data }) {

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