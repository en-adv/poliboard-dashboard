import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { ArrowCircleUpRounded, ArrowCircleDownRounded } from '@mui/icons-material';
import { TotalRevenueOptions, getTotalRevenueSeries } from './chart.config';

type SeriesItem = {
  name: string;
  data: number[]; // Contains data for yesterday and today
};

const TotalRevenue = () => {
  const [series, setSeries] = useState<SeriesItem[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [yesterdayTotal, setYesterdayTotal] = useState<number>(0);
  const [todayTotal, setTodayTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSeries: SeriesItem[] = await getTotalRevenueSeries();
      setSeries(fetchedSeries);

      // Calculate total revenue (sum of all values)
      const total = fetchedSeries.reduce((acc: number, item: SeriesItem) => {
        return acc + item.data.reduce((sum: number, value: number) => sum + value, 0);
      }, 0);
      setTotalRevenue(total);

      // Calculate totals for yesterday and today
      const yesterdaySum = fetchedSeries.reduce((acc, item) => acc + (item.data[0] || 0), 0);
      const todaySum = fetchedSeries.reduce((acc, item) => acc + (item.data[1] || 0), 0);
      setYesterdayTotal(yesterdaySum);
      setTodayTotal(todaySum);

      // Calculate percentage change (today vs yesterday)
      const change = yesterdaySum ? ((todaySum - yesterdaySum) / yesterdaySum) * 100 : 0;
      setPercentageChange(change);
    };

    // Fetch data initially
    fetchData();

    // Set up polling every 3 seconds
    const interval = setInterval(fetchData, 3000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Viewers
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Stack>
          <Typography fontSize={16} color="#808191">
            Yesterday
          </Typography>
          <Typography fontSize={20} fontWeight={700} color="#11142d">
            {yesterdayTotal.toLocaleString()}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize={16} color="#808191">
            Today
          </Typography>
          <Typography fontSize={20} fontWeight={700} color="#11142d">
            {todayTotal.toLocaleString()}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          {percentageChange >= 0 ? (
            <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475be8' }} />
          ) : (
            <ArrowCircleDownRounded sx={{ fontSize: 25, color: '#FF0000' }} />
          )}
          <Stack>
            <Typography fontSize={15} color={percentageChange >= 0 ? '#475be8' : '#FF0000'}>
              {Math.abs(percentageChange).toFixed(1)}%
            </Typography>
            <Typography fontSize={12} color="#808191">
              {percentageChange >= 0 ? 'Than Yesterday' : 'Below Yesterday'}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {series.length > 0 ? (
        <ReactApexChart
          series={series}
          type="bar"
          height={350}
          options={TotalRevenueOptions}
        />
      ) : (
        <Typography fontSize={14} color="#808191">
          Loading chart data...
        </Typography>
      )}
    </Box>
  );
};

export default TotalRevenue;
