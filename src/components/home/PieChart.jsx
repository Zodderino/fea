import Chart from "chart.js/auto"
import { useEffect, useRef } from "react";
import * as expenseUtil from "../../utils/expense"
import * as formatUtil from "../../utils/format"

export default function PieChart({ data: rawData }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
        const groupedByData = formatUtil.groupByKey(rawData, 'category')
        const amounts = expenseUtil.getTotalAmounts(groupedByData)
        const labels = Object.keys(groupedByData)

        const data = {
            labels: labels,
            datasets: [{
                label: 'Expense dataset',
                data: amounts,
                hoverOffset: 4
            }]
        };

        if (!chartRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        colors: {
                            forceOverride: true
                        }
                    }
                },
            })
            return;
        }

        chartRef.current.data = data

        chartRef.current.update();

    }, [rawData]);

    return (
        <div style={{ width: "60%", height: "60%", marginTop: "-25px" }}>
            <canvas id="pieChart" ref={canvasRef} />
        </div>
    )
}