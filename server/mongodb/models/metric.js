import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true }, // Ensure _id is a String, not ObjectId, and make it required
        look: { type: Number, required: true, default: 0 },
        'no look': { type: Number, required: true, default: 0 }, // Keep 'no look' as the database field name
        car: { type: Number, required: true, default: 0 },
        bike: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

// Define aliases for camelCase usage in the code while keeping the field name as 'no look' in the DB
metricSchema.virtual('noLook').get(function () {
    return this['no look']; // Access 'no look' field directly
}).set(function (value) {
    this['no look'] = value; // Set value for 'no look' when using 'noLook'
});

const Metric = mongoose.model('Metric', metricSchema);

export default Metric;
