import { ApexOptions } from 'apexcharts';
import axios from 'axios';

export const getTotalRevenueSeries = async () => {
  try {
    const response = await axios.get('https://poliboard-dashboard.vercel.app/api/v1/charts');
    const data = response.data;

    const series = data.map((item: any) => {
      // Sort data by date in ascending order
      const sortedData = [...item.data].sort(
        (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Get the last two entries (Yesterday and Today)
      const lastTwo = sortedData.slice(-2);

      const yesterdayValue = lastTwo[0]?.value || 0;
      const todayValue = lastTwo[1]?.value || 0;

      return {
        name: item.parameter,
        data: [yesterdayValue, todayValue],
      };
    });

    return series;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return [];
  }
};

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar', // You can change this to 'line' if you prefer a line chart
    toolbar: {
      show: false,
    },
  },
  colors: ['#475BE8', '#605678', '#FF7F0E', '#2CA02C', 'FF8A8A', '987D9A'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: ['Yesterday', 'Today'], // Automatically shifts to the most recent two days
  },
  yaxis: {
    title: {
      text: 'Values',
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${val}`;
      },
    },
  },
};
