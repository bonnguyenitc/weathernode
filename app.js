var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');

app.set('view engine','ejs');
app.use("/public",express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.listen(3000);