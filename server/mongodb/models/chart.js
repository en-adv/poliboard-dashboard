import mongoose from 'mongoose';

// Define the schema for the data array
const DataSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store dates as strings (e.g., "YYYY-MM-DD")
  value: { type: Number, required: true }, // Store the corresponding value
});

// Define the main schema for the chart data
const ChartSchema = new mongoose.Schema({
  parameter: { type: String, required: true }, // Name of the parameter (e.g., "Batu Aji")
  data: { type: [DataSchema], required: true }, // Array of data objects
});

// Create the model using the schema
const Chart = mongoose.model('Chart', ChartSchema);

export default Chart;
