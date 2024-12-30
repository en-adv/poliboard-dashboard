import cron from 'node-cron';
import { calculateAndUpdateMetrics } from './controllers/datacalc.controller.js';

// Schedule the task to run every hour
cron.schedule('*/3 * * * * *', async () => {
    console.log("Scheduled task started");
    try {
        await calculateAndUpdateMetrics();
        console.log("Scheduled task completed");
    } catch (error) {
        console.error("Error during scheduled task:", error);
    }
});
