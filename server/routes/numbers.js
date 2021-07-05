const express = require('express');
const { processNumbers } = require('../controllers/numbers');
const router = express.Router();
 
router.post( '/post-numbers', processNumbers );

module.exports = { router };