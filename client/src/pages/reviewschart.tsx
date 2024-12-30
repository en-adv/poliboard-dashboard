import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ReviewsChart = () => {
    const [chartData, setChartData] = useState({
        series: [] as { name: string; data: { x: string; y: number }[] }[],
        options: {
            chart: {
                type: "line" as "line", // Explicitly setting type as allowed literal
                zoom: {
                    enabled: false,
                },
                background: "#ffffff", // Set background color to white
            },
            xaxis: {
                type: "datetime" as "datetime", // Explicitly setting type as allowed literal
                categories: [] as string[],
            },
            yaxis: {
                title: {
                    text: "Values",
                },
            },
            stroke: {
                curve: "smooth" as "smooth", // Explicitly setting type as allowed literal
            },
            title: {
                text: "All Time Charts",
                align: "center" as "center", // Explicitly setting type as allowed literal
            },
        },
    });

    const fetchChartData = async () => {
        try {
            const response = await axios.get("https://poliboard-dashboard.vercel.app/api/v1/charts");
            const data = response.data;

            const series = data.map((region: any) => ({
                name: region.parameter,
                data: region.data.map((entry: any) => ({
                    x: new Date(entry.date).toISOString(),
                    y: entry.value,
                })),
            }));

            setChartData((prev) => ({
                ...prev,
                series,
            }));
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    return (
        <div>
            {chartData.series.length > 0 ? (
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ReviewsChart;
