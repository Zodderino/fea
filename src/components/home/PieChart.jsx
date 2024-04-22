import Chart from "chart.js/auto"
import {useEffect, useRef} from "react";

export default function PieChart() {
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
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
                        title: {
                            display: false,
                            text: 'Chart.js Pie Chart'
                        }
                    }
                },
            })
            return;
        }

        chartRef.current.update();

    }, [data]);

    return (
        <div>
            <canvas id="pieChart" ref={canvasRef}/>
        </div>
    )
}