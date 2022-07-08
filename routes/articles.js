const express = require('express')
// const article = require('../models/article2')
const Article = require('../models/article')
const router = express.Router()

router.get('/new',(req, res) => {
    // res.send('In articles - God is amazing')
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => { 
   
//    before using '/:id' we used the below article:
    // let article = await Article.findById(req.params.id)

    const article = await Article.findOne({ slug: req.params.slug})

    // res.send(req.params.id)

    if (article == null) res.redirect('/')

   res.render('articles/show', { article : article}) 
})

router.post('/', async (req,res, next) => {
    // let article = new Article({
    //     // here we can access everything we put in the new article page
    //     title: req.body.title,
    //     description: req.body.description,
    //     markdown: req.body.markdown
    // })

    // try{
    //     // asynchfunc
    //   article =  await article.save()

    // //   before when usin the id instead of the slug we'd use:
    // //   res.redirect(`/articles/${article.id}`)
    //     res.redirect(`/articles/${article.slug}`)

    // //   res.redirect('/articles/')
    // } catch (e) {
    //     // this will prefill everything we had in case an error happened
    //     console.log(e)
    //     res.render('articles/new', { article: article})
    // }

    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path){
    return async (req, res) => {

        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    
    try{
      article =  await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        console.log(e)
        res.render(`articles/${path}`, { article: article})
    }

    }
}

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    // this will redirect to the homepage:
    res.redirect('/')
})


module.exports = router

