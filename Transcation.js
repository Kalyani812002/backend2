const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;


const Transaction = require('./models/Transaction');

const transactions = [
  { title: 'Laptop', description: 'Dell XPS 13', price: 1000 },
  { title: 'Phone', description: 'iPhone 13', price: 999 },
  { title: 'Headphones', description: 'Sony WH-1000XM4', price: 350 },
  // Add more sample data as needed
];

Transaction.insertMany(transactions)
  .then(() => console.log('Sample transactions inserted'))
  .catch(err => console.log(err));
