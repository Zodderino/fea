import Chart from "chart.js/auto"
import {useEffect, useRef} from "react";

export default function CombinedBarLine() {
    const labels = ["January", "February", "March", "April", "May", "June", "July"]

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [50, 70, 100, 20, 50, 60, 20],
                stack: 'combined',
                type: 'bar'
            },
            {
                label: 'Dataset 2',
                data: [60, 80, 90, 10, 70, 50, 10],
                stack: 'combined'
            }
        ]
    };;
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
        if (!chartRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: data,
                options: {
                    plugins: {
                        title: {
                            display: false,
                            text: 'Chart.js Stacked Line/Bar Chart'
                        }
                    },
                    scales: {
                        y: {
                            stacked: true
                        }
                    }
                },
            })
            return;
        }

        chartRef.current.update();

    }, [data]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <canvas id="combinedBarLine" ref={canvasRef}/>
        </div>
    )

}