const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /transactions: List transactions with search and pagination
router.get('/transactions', async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '' } = req.query;

    const query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const totalTransactions = await Transaction.countDocuments(query);

    res.json({
      transactions,
      totalTransactions,
      totalPages: Math.ceil(totalTransactions / perPage),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



