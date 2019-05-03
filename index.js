let express = require('express');
let app = express();

let port = process.env.PORT || 8080;

let cors = require('cors’);
let bodyParser = require('body-parser');

let mongoose = require('mongoose');
let  db = mongoose.connection;

let messageRoutes = require("./messageRoutes");

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/api/messages', messageRoutes);

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://admin:admin1@ds149606.mlab.com:49606/chat');

// Launch app to listen to specified port
app.listen(port, () => {
    console.log("Running DB2 test task on port " + port);
});