const mongoose =require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: false
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
        // this slug will sustitute our id and can't be the same.
    },
   sanitizedHtml: {
    type: String,
    required: true
  }

})


// here we will validate that our slug is unique, to prevent having duplicates in our DB
articleSchema.pre('validate', function(next) {
    // this function will run before it's saved
    // strict will remove : if there is any in the title
    if (this.title) {
        this.slug = slugify(this.title, { 
            lower: true,
            strict: true
        })
    }

 if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

    next()
})

module.exports = mongoose.model('Article', articleSchema)