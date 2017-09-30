var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }
  , {
    id: 3,
    username: "HelenesTest"
  }
  , {
    id: 4,
    username: "NewUserYup"
  }
  , {
    id: 5,
    username: "AnotherNewUser"
  }
  , {
    id: 6,
    username: "YetAnotherNewUser"
  }
  , {
    id: 7,
    username: "YetAnotherYetAnotherNewUser"
  }
  , {
    id: 8,
    username: "SuperUser"
  }]);
});

module.exports = router;
