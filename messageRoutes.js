// Initialize express router
let router = require('express').Router();

let messageController = require('./messageController');

// Message routes
router.route('/list/:page')
    .get(messageController.index);

router.route('/')
    .post(messageController.new);

router.route('/single/:message_id')
    .get(messageController.view)
    .patch(messageController.update)
    .put(messageController.update)
    .delete(messageController.delete);

// Export API routes
module.exports = router;
