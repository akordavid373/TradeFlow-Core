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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`TradeFlow-Core API server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});
