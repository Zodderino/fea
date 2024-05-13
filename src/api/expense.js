import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function getExpenseList({startDate, endDate, token}) {
    try {
        const response = await axios.get(baseUrl + `/api/expenses/filter`, {
            params: {
                from: startDate,
                to: endDate
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data
    } catch (err) {
        console.error(err)
    }
}

export async function uploadExpense({file, token}) {
    const form = new FormData();
    form.append("file", file)
    const response = await axios.post(baseUrl + `/api/expenses/bulk`, form, {
        headers: {"Authorization": `Bearer ${token}`}
    });
    return response.data
}