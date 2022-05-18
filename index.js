const express = require("express");
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Comment = require('./models/comment');
const path = require('path');
const { mainModule } = require("process");

// connect to the mongoose
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://Devil:Password%40123@basic.q8ju6.mongodb.net/Basic?retryWrites=true&w=majority');
    await console.log('Mongo Connection Established!!')
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
    const data = await Comment.find({})
    // console.log(data);
    res.render('home', { data })
})

app.get('/newcomment', async (req, res) => {
    res.render('newCommentPage')
})


app.post('/newcomment', async (req, res) => {
    const { userName, comment } = req.body
    // console.log(`userName: ${userName} comment: ${comment}`);
    const newComment = await new Comment(req.body)
    await newComment.save()
    res.redirect('/')

})

app.get('/comment/edit/:_id', async (req, res) => {
    const _id = req.params
    // console.log(_id);
    const comment = await Comment.findById(_id)
    res.render('edit', { comment })
})


app.put('/comment/edit/:_id', async (req, res) => {
    const { _id } = req.params
    // const { comment } = req.body
    // console.log(_id);
    // console.log(req.body.comment);
    const update = await Comment.findByIdAndUpdate(_id, { comment: req.body.comment })

    // comment.save()
    res.redirect('/')
})

app.delete('/comment/delete/:id', async (req, res) => {
    const _id = req.params.id
    const comment = await Comment.findByIdAndDelete(_id)
    console.log(comment);
    res.redirect('/')
})

app.listen(8080, () => {
    console.log(`Listeining on port 8080`);

})
