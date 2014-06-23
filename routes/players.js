var express = require('express');
var router = express.Router();

/* GET playerslist. */
router.get('/playerslist', function(req, res) {
  var db = req.db;
  db.collection('players').find().toArray(function (err, items){
  	res.json(items);
  });
});

module.exports = router;
