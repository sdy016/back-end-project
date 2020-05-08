const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('어우야');
});

module.exports = router;
