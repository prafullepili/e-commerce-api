const express = require('express');
const { getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword } = require('../controllers/userController')
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)
router.route('/:id').get(authenticateUser, authorizePermissions('admin'), getSingleUser)


module.exports = router