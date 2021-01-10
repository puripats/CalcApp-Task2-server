var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const MongoClient = require('mongodb')
const mongoose = require('mongoose')
const Calc = require('./models/calc')


var connectionString ='mongodb+srv://chonoi:Poopoo09@cluster0.3urau.mongodb.net/CalcApp?retryWrites=true&w=majority'
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

mongoose.connect(connectionString,{ useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
 
}).catch(error => console.error(error))

var app = express();
const bodyParser= require('body-parser')

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html')
})





/*
app.post('/loadCalc', async (req, res) => {
  console.log(req.body)

  const calc = new Calc(req.body)
  console.log(calc)
  await calc.save()
  .then(res.status(201).end())
})
*/
app.put('/saveCalc', async (req, res) => {
  console.log(req.body)

  
  Calc.findOneAndUpdate(
    {}, 
    {
      $set:{numA:req.body.numA,
      numB:req.body.numB,
      operator:req.body.operator,
      result:req.body.result
    }},{
      upsert: true
    }
    ).then(result => {
     // console.log(result)
     })

})

app.get('/loadCalc', function(req, res) {
  console.log('why')
  Calc.find({})
  .then(results => {
    console.log(results[0].numA)
    res.json({
      numA:results[0].numA,
      numB:results[0].numB,
      operator:results[0].operator,
      result:results[0].result
    })
  })
  .catch(error => console.error(error))
})













// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
