const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, authorize('admin'), getAllUsers);

module.exports = router;


// const express = require('express');
// const { protect, roleMiddleware } = require('../middleware/authMiddleware');
// const { getUsers } = require('../controllers/userController');

// const router = express.Router();

// // Only Admins can access this route
// router.get('/', protect, roleMiddleware(['Admin']), getUsers);

// module.exports = router;
