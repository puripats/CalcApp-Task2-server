var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TESSSSSSSST' });
});

router.get('/hello', function(req, res, next) {
  res.render('Hello');

});

router.post('/quotes', function(req, res, next) {
  console.log('Hello Test')

});

module.exports = router;
