const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TradeFlow-Core Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'TradeFlow-Core Backend API',
    version: '1.0.0',
    description: 'Backend API for TradeFlow-Core smart contracts on Stellar/Soroban',
    endpoints: {
      health: '/health',
      contracts: {
        invoiceNft: 'Invoice NFT smart contract endpoints',
        lendingPool: 'Lending Pool smart contract endpoints'
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TradeFlow-Core Backend API server is running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});
