const express = require('express');
const { getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword } = require('../controllers/userController')
const router = express.Router();
const { authenticateUser, authorizePermissions, checkPermissions } = require('../middleware/authentication')

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers) //only admin can access allUsers data , we can chnage other value like ,'owner'
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/:id').get(authenticateUser, checkPermissions, getSingleUser)


module.exports = router