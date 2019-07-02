var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('./routes/routes.js'));
app.use(express.static('src'));

var port = process.env.PORT || 1337;
var localhost = '127.0.0.1';


app.listen(port, "0.0.0.0", function() {
  console.log('\x1b[32m',
      "  -----------------------------------------------------------------\n" +
      "   : + - \\ | / - \\ | / - \\ | / - \\ | / - \\ | / - \\ | / - \\ | / - + : \n" +
      "   : | <-------------------------------------------------------> | :\n" +
      "   : / :                you will find the app here:            : \\ :\n" +
    "   : - :                   http://" + localhost + ":" + port + "              : - :\n" +
      "   : \\ :                          ENJOY!                       : / :\n" +
      "   : | <-------------------------------------------------------> | :\n" +
      "   : + - / | \\ - / | \\ - / | \\ - / | \\ - / | \\ - / | \\ - / | \\ - + :\n" +
      "   -----------------------------------------------------------------\n" +
      "   2019                                                     djurango",
      '\x1b[0m'
  )
});


