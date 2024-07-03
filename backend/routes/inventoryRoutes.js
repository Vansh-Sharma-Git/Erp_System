const express = require('express');
const router = express.Router();
const { addItem, getItems } = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addItem);
router.get('/', getItems);

module.exports = router;
