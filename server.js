// app.js or server.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const http = require('http');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = process.env.PORT || 5000
// const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);


const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// set DB  mongoose, put whatever name, in this case blog
// mongoose.connect('mongodb://localhost/blog', {
 
// })

// mongoose.connect(process.env.DB_URL || 'mongodb://localhost/blog', {

// });

 mongoose
    .connect(
        process.env.DB_URL || 'mongodb://localhost/blog',
      {
        //   these are options to ensure that the connection is done properly

      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });





// ============================================

// set view engine
app.set('view engine', 'ejs')

//To access the new article data inside the router. This must be first than the app.use('/articles',articleRouter) or it will crash
app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))

// test app is working
app.get('/', async (req, res) => {
    // res.send('God is so amazing! Thank you!')
    // the below is to pass any object we want in a form of a dictionary and it will be available in the index.ejs
    // res.render('index', { text: 'Jesus is King'})

//     const articles = [{
//         title: "Galatians 1",
//         createdAt: new Date(),
//         description: 'The law is no more - Paul'
//     },
// {
//         title: "Galatians 2",
//         createdAt: new Date(),
//         description: 'The law is no more part 2 - Paul  -  laure asldfj a;sdkljf ;aklsdjfa;slj f;ls jf;alsjdf a;sdfl'
//     }

// 
    const articles = await Article.find().sort({createdAt: 'desc'})



    res.render('articles/index', { articles: articles})
})

// use the router. The /articles will force to all websites beggins with that.
app.use('/articles',articleRouter)


app.listen(port, () => console.log(`listening on port ${port}`));


// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
//   const address = server.address();
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
//   console.log('Listening on ' + bind);
// });

// server.listen(port);
// module.exports = app;