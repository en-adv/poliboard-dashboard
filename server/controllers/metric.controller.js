import Metric from '../mongodb/models/metric.js';

const getMetrics = async (req, res) => {
    try {
        // Define the list of document ID prefixes
        const documentIds = ['Batamcenter', 'Bengkong', 'Piayu', 'Batuaji', 'Nongsa', 'Tiban'];

        // Query MongoDB to get all documents with matching prefixes using $regex
        const rawMetricsList = await Metric.find({
            _id: { $regex: new RegExp(`^(${documentIds.join('|')})_`) } // Match any document starting with any of the prefixes
        });

        if (rawMetricsList.length === 0) {
            return res.status(404).json({ message: 'No documents found' });
        }

        // Find the most recent document based on the timestamp in the document ID
        const mostRecentMetric = rawMetricsList.reduce((latest, current) => {
            const latestDate = latest._id.split('_')[1]; // Extract the timestamp from the ID (e.g., "2024-12-27 14:52")
            const currentDate = current._id.split('_')[1]; // Extract the timestamp from the ID (e.g., "2024-12-27 15:43")

            // Compare the timestamps
            if (new Date(currentDate) > new Date(latestDate)) {
                return current; // Return the current one if it has a more recent timestamp
            }
            return latest;
        });

        // Format the metrics for the response
        const formattedMetrics = [
            { title: 'look', value: mostRecentMetric.look || 0 },
            { title: 'no look', value: mostRecentMetric['no look'] || 0 },
            { title: 'car', value: mostRecentMetric.car || 0 },
            { title: 'bike', value: mostRecentMetric.bike || 0 },
        ];

        // Send the most recent metrics data
        res.status(200).json(formattedMetrics);
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ message: error.message });
    }
};

export { getMetrics };
