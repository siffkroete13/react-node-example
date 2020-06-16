const PORT = 8888;
const express = require('express');
const app = express();
const mealsRouter = require('./routes/mealsRouter');
// const bodyParser = require('body-parser')


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());          // to support JSON-encoded bodies 
app.use(express.urlencoded({      // to support URL-encoded bodies
    extended: true // true precises that the req.body object will contain values of any type instead of just strings.
}));


app.use('/item', mealsRouter);
app.use('/user', userRouter);



// Letzer eigener Fehlerhandler
app.use( function(err, req, res, next)  {
  if (err.name === 'UnauthorizedError') {
      if(!err.status) err.status = 401;
      console.log('\n------------------\n', 'Letzter Fehlerhandler: Fehler: ', err, '\n------------------\n');
      res.status(401).json({
          'data': '',
          'err': err,
          'token': ''
      });
  } else {
      if(!err.status) err.status = 500;
      console.log('\n------------------\n', 'Letzter Fehlerhandler: Fehler: ', err, '\n------------------\n');
      res.status(500).json({
          'data': '',
          'err': err,
          'token': ''
      });
  }
});



app.listen(PORT, () => {
    console.log(`===> ${PORT}`);
});
