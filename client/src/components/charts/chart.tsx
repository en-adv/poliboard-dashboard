import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { TotalRevenueOptions, getTotalRevenueSeries } from './chart.config';

const TotalRevenue = () => {
  const [chartSeries, setChartSeries] = useState<any[]>([]); // Specify 'any[]' or a suitable type for your series data
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const series = await getTotalRevenueSeries();
        setChartSeries(series);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading chart data...</p> // Display a loading message while fetching data
      ) : chartSeries.length > 0 ? (
        <Chart
          options={TotalRevenueOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      ) : (
        <p>No data available for yesterday and today.</p> // Handle empty data case
      )}
    </div>
  );
};

export default TotalRevenue;
