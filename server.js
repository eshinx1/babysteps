var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//routes
var helper = require('./routes/helpers')
var signup = require('./routes/signup');
var login = require('./routes/login');
var milestone = require('./routes/milestone');
var dashboard = require('./routes/dashboard.js');
var edit = require('./routes/editChild.js');
var vaccinations = require('./routes/vaccinations.js');
var events = require('./routes/events.js');

app.use(express.static(__dirname + '/client/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/signup', signup);
app.use('/login', login);
app.use('/edit', edit);
app.use('/milestone', milestone);
app.use('/dashboard', dashboard);
app.use('/vaccinations', vaccinations);
app.use('/events', events);

app.listen(8080, function() {
  console.log('Listening to localhost:8080');
});