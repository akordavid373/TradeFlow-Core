const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply Helmet.js security headers globally
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TradeFlow-Core API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api/contracts', (req, res) => {
  res.json({
    invoice_nft: {
      network: 'Testnet',
      contract_id: 'CCYU3LOQI34VHVN3ZOSEBHHKL4YK36FMTOEGLRYDUDRGS7JOLLRKCEQM'
    },
    lending_pool: {
      network: 'Testnet', 
      contract_id: 'CDVJMVPLZJKXSJFDY5AWBOUIRN73BKU2SG674MQDH4GRE6BGBPQD33IQ'
    }
  });
});

// Assets endpoint with pagination support
app.get('/api/assets', (req, res) => {
  // Extract pagination parameters with fallback defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  // Console log the parsed values for debugging
  console.log(`Pagination parameters - Page: ${page}, Limit: ${limit}`);
  
  // Mock assets data (this would typically come from a database)
  const mockAssets = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', type: 'cryptocurrency', value: 45000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', type: 'cryptocurrency', value: 3000 },
    { id: 3, name: 'US Dollar', symbol: 'USD', type: 'fiat', value: 1 },
    { id: 4, name: 'Euro', symbol: 'EUR', type: 'fiat', value: 1.1 },
    { id: 5, name: 'Gold', symbol: 'XAU', type: 'commodity', value: 1800 },
    { id: 6, name: 'Silver', symbol: 'XAG', type: 'commodity', value: 25 },
    { id: 7, name: 'Apple Stock', symbol: 'AAPL', type: 'stock', value: 150 },
    { id: 8, name: 'Tesla Stock', symbol: 'TSLA', type: 'stock', value: 800 },
    { id: 9, name: 'Real Estate', symbol: 'RE', type: 'property', value: 250000 },
    { id: 10, name: 'Bonds', symbol: 'BND', type: 'bond', value: 1000 },
    { id: 11, name: 'Litecoin', symbol: 'LTC', type: 'cryptocurrency', value: 150 },
    { id: 12, name: 'Ripple', symbol: 'XRP', type: 'cryptocurrency', value: 0.6 }
  ];
  
  // For now, return all assets (pagination logic will be implemented later)
  // This is just to prepare the endpoint structure
  res.json({
    assets: mockAssets,
    pagination: {
      page: page,
      limit: limit,
      total: mockAssets.length,
      message: 'Pagination parameters parsed successfully. Database pagination will be implemented in a future issue.'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Global 404 Not Found handler - catches all unmatched routes
// Must be placed after all other route declarations
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`TradeFlow-Core API server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});
