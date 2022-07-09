const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article2')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()



// set DB  mongoose, put whatever name, in this case blog
// mongoose.connect('mongodb://localhost/blog', {
 
// })

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog', {

});

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

app.listen(5000)
