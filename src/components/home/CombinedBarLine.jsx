import Chart from "chart.js/auto"
import { useEffect, useRef } from "react";
import * as timeUtil from "../../utils/time"
import * as formatUtil from "../../utils/format"
import * as expenseUtil from "../../utils/expense"

export default function CombinedBarLine({ data }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
        const addMonthYearToData = data.sort(
            (a, b) => timeUtil.getUnixInteger(a.expenseDate) - timeUtil.getUnixInteger(b.expenseDate)
        ).map(item => {
            const yearMonth = timeUtil.getYearMonth(item.expenseDate)
            return { ...item, yearMonth }
        })

        const groupedBy = formatUtil.groupByKey(addMonthYearToData, 'yearMonth')

        const expensesMonthly = expenseUtil.getTotalAmounts(groupedBy)
        const averageExpenseMonthly = expenseUtil.getAverageAmount(groupedBy)
        const labels = Object.keys(groupedBy)

        const formattedData = {
            labels: labels,
            datasets: [
                {
                    label: 'Monthly Expense Total',
                    data: expensesMonthly,
                    type: 'bar'
                },
                {
                    label: 'Monthly Expense Average',
                    data: averageExpenseMonthly,
                    type: 'line',
                    order: 1
                },
            ]
        };;

        if (!chartRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'bar',
                data: formattedData,
                options: {
                    responsive: true,
                },
            })
            return;
        }

        chartRef.current.data = formattedData

        chartRef.current.update();

    }, [data]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <canvas id="combinedBarLine" ref={canvasRef} />
        </div>
    )

}