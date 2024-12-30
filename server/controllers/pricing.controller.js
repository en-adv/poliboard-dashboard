import Property from '../mongodb/models/property.js';

const updateBillboardPrices = async (req, res) => {
    try {
        const { engagements } = req.body; // Array of { title, percentage }

        if (!Array.isArray(engagements)) {
            return res.status(400).json({ message: "Invalid request: 'engagements' must be an array." });
        }

        for (const engagement of engagements) {
            const { title, percentage } = engagement;

            const property = await Property.findOne({ title });
            if (!property) continue;

            const basePrice = 6000; // Set your base price here (can also be stored in the database)
            const newPrice = Math.round(basePrice * (1 + percentage / 100));

            // Update the property price only if it differs
            if (property.price !== newPrice) {
                property.price = newPrice;
                await property.save();
                console.log(`Updated price for '${title}' to ${newPrice}`);
            } else {
                console.log(`Price for '${title}' remains the same at ${property.price}`);
            }
        }

        res.status(200).json({ message: 'Prices updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating prices', error });
    }
};

export { updateBillboardPrices };
