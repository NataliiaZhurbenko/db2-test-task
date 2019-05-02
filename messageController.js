Message = require('./messageModel');

// Handle index actions
exports.index = (req, res) => {
    const page =  Math.max(0, req.params.page);
    Message.get( (err, messages) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Messages retrieved successfully",
            data: messages
        });
    }, page)
};

// Handle create message actions
exports.new = (req, res) => {
    let message = new Message();
    message.author = req.body.author;
    message.text = req.body.text;
    message.email = req.body.email;

// save the message and check for errors
    message.save( (err, doc) => {
        if (err)
            res.json(err);

        res.json({
            message: 'New message created!',
            data: doc
        });
    });
};

// Handle view message info
exports.view = (req, res) => {
    Message.findById(req.params.message_id, (err, message) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Message details loading..',
            data: message
        });
    });
};

// Handle update message info
exports.update = (req, res) => {

    Message.findById(req.params.message_id, (err, message) => {
        if (err)
            res.send(err);

        message.author = req.body.author;
        message.text = req.body.text.length > 100?  req.body.text : "";
        message.email = req.body.email;
        message.update_date = Date.now;

// Save the message and check for errors
        message.save((err, doc) => {
            if (err)
                res.json(err);
            res.json({
                message: 'Message Info updated',
                data: doc
            });
        });
    });
};

// Handle delete message
exports.delete = (req, res) => {
    Message.remove({
        _id: req.params.message_id
    }, (err) => {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Message deleted'
        });
    });
};