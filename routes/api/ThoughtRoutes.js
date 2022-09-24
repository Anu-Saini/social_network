const router = require('express').Router();

const {
  getAllThought,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

//api route for geting all thoughts
router.route('/').get(getAllThought);

router.route('/:id')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

// api for single user
router.route('/:userId').post(createThought);
router.route('/:thoughtId/Reaction').post(createReaction);
router.route('/:thoughtId/Reaction/:ReactionID').delete(deleteReaction);

module.exports = router;