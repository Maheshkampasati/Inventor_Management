const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Simple report: usage stats
router.get('/stats', async (req, res) => {
  const items = await Item.find({});
  // Example: send total, low stock, expirations
  const total = items.length;
  const lowStock = items.filter(i => i.stock <= i.reorderLevel);
  const expiring = items.filter(i => i.expiryDate && new Date(i.expiryDate) < new Date(Date.now() + 3*24*60*60*1000));
  res.json({ total, lowStock: lowStock.length, expiring: expiring.length });
});

module.exports = router;
