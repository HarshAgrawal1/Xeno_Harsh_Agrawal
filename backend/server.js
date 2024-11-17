const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');
const campaignRoutes = require('./routes/campaign');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const audienceRoutes = require('./routes/audience');


// Route to create a new audience segment


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const messageRoutes = require('./routes/messageRoutes');
const deliveryReceiptRoutes = require('./routes/deliveryReceipt');
const campaignStatsRoutes = require('./routes/campaignStats');

// Enable CORS
app.use(cors());

// Body parser middleware to handle JSON requests
app.use(express.json());

// API routes
app.use('/api', authRoutes);
app.use('/api/audience', audienceRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/delivery', deliveryReceiptRoutes);
app.use('/api/stats', campaignStatsRoutes);

// Default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Campaign Management API');
});


// app.get('/api/messages',(req,res)=>{
//   res.send("hehe");
// })

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


