// stuff we need
var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  request = require('request'),
  bluebird = require('bluebird');


// import the routes
var routes = require('./routes/index'),
  webhook = require('./routes/webhook'),
  tripAPI = require('./routes/trips'),
  chargingAPI = require('./routes/charging'),
  parkingAPI = require('./routes/parking');

// set up and connect to mongodb using mongoose
var mongoose = require('mongoose'),
  mongoURL = 'mongodb://localhost:27017/trips';

var cacheVegvesenet = require('./init').cacheVegvesenet;
var cacheTrips = require('./init').cacheTrips;

mongoose.connect(mongoURL);
mongoose.set('debug', true);
mongoose.Promise = bluebird;

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/', routes);
app.use('/api/v1/trips', tripAPI);
app.use('/api/v1/charging', chargingAPI);
app.use('/api/v1/parking', parkingAPI);

// disabled automatic pull as that will not work at the moment
//app.use('/webhook', webhook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

var readline = require('readline');

var handleCommand = function(answer) {
  // TODO: Log the answer in a database
  switch(answer) {
    case 'cacheVegvesenet': {
      console.log('Caching vegvesenet parking...')
      cacheVegvesenet();
      break;
    }
    case 'cacheTrips': {
      console.log('Caching trips...')
      cacheTrips();
      break;
    }
    default: {
      console.log("Invalid command. Use either \'cacheVegvesenet\' or \'cacheTrips\'");
      break;
    }
  }
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();
rl.on('line', function(line) {
  handleCommand(line);
  rl.prompt();
}).on('close',function(){
    process.exit(0);
});

//cacheVegvesenet();
//cacheTrips();

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})

module.exports = app;
