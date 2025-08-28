const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

// Add item (manager only)
router.post('/add', async (req, res) => {
  const { name, category, emoji, stock, reorderLevel, expiryDate } = req.body;
  const item = new Item({ name, category, emoji, stock, reorderLevel, expiryDate });
  await item.save();
  res.json(item);
});

// Update stock (staff/manager)
router.put('/update/:id', async (req, res) => {
  const { stock } = req.body;
  const item = await Item.findByIdAndUpdate(req.params.id, { stock }, { new: true });
  res.json(item);
});

// Delete item (manager only)
router.delete('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Item deleted' });
});

module.exports = router;
