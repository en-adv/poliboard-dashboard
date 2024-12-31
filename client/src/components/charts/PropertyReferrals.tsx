import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { getTotalRevenueSeries } from './chart.config';

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage.toFixed(2)}%
      </Typography>
    </Stack>
    <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="#e4e8ef">
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);

const PropertyReferrals = () => {
  const [engagementData, setEngagementData] = useState<ProgressBarProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const chartData = await getTotalRevenueSeries();

      // Calculate total values for all billboards (sum of yesterday and today)
      const totalValues = chartData.reduce((sum: number, item: any) => {
        return sum + item.data.reduce((acc: number, value: number) => acc + value, 0);
      }, 0);

      // Calculate engagement percentage for each billboard (based on yesterday and today)
      const calculatedData = chartData.map((item: any, index: number) => ({
        title: item.name,
        percentage:
          (item.data.reduce((acc: number, value: number) => acc + value, 0) / totalValues) * 100, // Sum of yesterday + today for each parameter
        color: ['#475BE8', '#605678', '#FF7F0E', '#2CA02C', '#FF8A8A', '#800000'][index % 6], // Rotate colors
      }));

      setEngagementData(calculatedData);
// Send engagement data to the backend to update prices
       await fetch('https://poliboard-dashboard.vercel.app/api/v1/pricing/update-prices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ engagements: calculatedData }),
    });
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
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Billboard Engagement
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {engagementData.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
