const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authMiddleware} = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.get('/', authController.home);
// Register a new user
router.post('/auth/register', authController.register);

// Login an existing user
router.post('/auth/login', authController.login);

router.use(authMiddleware);

router.get('/user', authController.fetchUser);
router.post('/task', taskController.createTask);
router.get('/task/:user_id', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;