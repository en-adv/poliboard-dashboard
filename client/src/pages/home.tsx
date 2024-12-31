import { useEffect } from "react";
import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { PieChart, PropertyReferrals, TotalRevenue, PropertyCard } from "components";

interface Metric {
    title: string;
    value: number;
}

const Home = () => {
    // Fetch metrics data
    const {
        data: metricsData,
        isLoading: metricsLoading,
        isError: metricsError,
        refetch: refetchMetrics, // Extract refetch for metrics
    } = useList<Metric>({
        resource: "metrics",
    });

    const metrics: Metric[] = metricsData?.data ?? [];

    // Fetch properties data
    const {
        data,
        isLoading: propertiesLoading,
        isError: propertiesError,
        refetch: refetchProperties, // Extract refetch for properties
    } = useList({
        resource: "properties",
        config: {
            pagination: {
                pageSize: 6,
            },
        },
    });

    const latestProperties = data?.data ?? [];

    const getMetricValue = (title: string): number => {
        const metric = metrics.find((item: Metric) => item.title === title);
        return metric ? metric.value : 0;
    };

    useEffect(() => {
        // Poll every 3 seconds (adjust as needed)
        const interval = setInterval(() => {
            refetchMetrics(); // Re-fetch metrics
            refetchProperties(); // Re-fetch properties
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [refetchMetrics, refetchProperties]);

    if (metricsLoading || propertiesLoading) return <Typography>Loading...</Typography>;
    if (metricsError || propertiesError) return <Typography>Something went wrong!</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="viewers"
                    value={getMetricValue("look")}
                    series={[getMetricValue("look"), 100]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="cars"
                    value={getMetricValue("car")}
                    series={[getMetricValue("car"), 100]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="bikes"
                    value={getMetricValue("bike")}
                    series={[getMetricValue("bike"), 100]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="people"
                    value={getMetricValue("no look")}
                    series={[getMetricValue("no look"), 100]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </Box>

            <Stack mt="25px" width="100%" direction={{ xs: "column", lg: "row" }} gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest Properties
                </Typography>

                <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
