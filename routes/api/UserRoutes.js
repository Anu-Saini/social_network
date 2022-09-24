const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

//api route for geting all users
router.route('/').get(getUsers).post(createUser);

// api for single user
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// api for friends
router.route('/:userId/friends/friendId').post(createFriend).delete(deleteFriend);

module.exports = router;