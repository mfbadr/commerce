'use strict';

var express = require('express');

var app = express();

require('./lib/config')(app);

require('./lib/pipeline')(app, express);

// declare db name when initializing, just like PORT
var db = process.env.DB;
require('./lib/mongodb')(db);

var port = process.env.PORT;
app.listen(port, function(){
  console.log('Express is listening on PORT', port + '...');
});
