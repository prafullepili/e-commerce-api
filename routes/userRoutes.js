const express = require('express');
const { getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword } = require('../controllers/userController')
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router.route('/').get(authenticateUser, authorizePermissions, getAllUsers)
router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)
router.route('/:id').get(authenticateUser, authorizePermissions, getSingleUser)


module.exports = router