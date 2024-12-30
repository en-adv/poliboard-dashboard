import Metric from '../mongodb/models/metric.js';
import Chart from '../mongodb/models/chart.js';

const calculateAndUpdateMetrics = async () => {
    console.log("calculateAndUpdateMetrics function started");

    
    try {
        const regionMapping = {
            Batamcenter: "Batam Center",
            Bengkong: "Bengkong",
            Piayu: "Piayu",
            Batuaji: "Batu Aji",
            Nongsa: "Nongsa",
            Tiban: "Tiban"
        };

        for (const [metricRegion, chartRegion] of Object.entries(regionMapping)) {
            console.log(`Processing region: ${metricRegion}`);

            // Fetch all metrics for the region
            const metrics = await Metric.find({
                _id: { $regex: new RegExp(`^${metricRegion}_`) }
            }).sort({ _id: 1 }); // Sort by date ascending

            if (!metrics || metrics.length === 0) {
                console.log(`No metrics found for region: ${metricRegion}`);
                continue;
            }

            console.log(`Found metrics for region ${metricRegion}: ${metrics.length} entries`);

            // Fetch the current chart entry for the region
            let chartEntry = await Chart.findOne({ parameter: chartRegion });

            if (!chartEntry) {
                console.log(`Creating new chart entry for region: ${chartRegion}`);
                chartEntry = new Chart({
                    parameter: chartRegion,
                    data: []
                });
            }

            // Create a map to aggregate values by date
            const dateValueMap = new Map();

            for (const metric of metrics) {
                // Extract the date and calculate total value
                const metricDate = metric._id.split('_')[1].split(' ')[0];
                const totalValue =
                    (metric.look || 0) +
                    (metric['no look'] || 0) +
                    (metric.car || 0) +
                    (metric.bike || 0);

                // Aggregate values for the same date
                if (dateValueMap.has(metricDate)) {
                    dateValueMap.set(
                        metricDate,
                        dateValueMap.get(metricDate) + totalValue
                    );
                } else {
                    dateValueMap.set(metricDate, totalValue);
                }
            }

            // Update chart data with aggregated values
            chartEntry.data = Array.from(dateValueMap.entries())
                .map(([date, value]) => ({ date, value }))
                .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ensure the data is sorted by date

            try {
                // Save the updated chart entry
                await Chart.findOneAndUpdate(
                    { parameter: chartRegion },
                    { $set: { data: chartEntry.data } }, // Update the `data` field
                    { upsert: true, new: true }          // Create a new document if not exists
                );

                console.log(`Chart updated for region: ${chartRegion}`);
            } catch (error) {
                console.error("Error saving Chart document:", error);
            }
        }

        console.log("Metrics update complete!");
    } catch (error) {
        console.error("Error during calculateAndUpdateMetrics:", error);
        throw error;
    }
};

export { calculateAndUpdateMetrics };
