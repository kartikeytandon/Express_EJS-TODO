const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const date = require(__dirname + '/date.js')
const Item = require('./model')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://tandonkartikey:tandonkartikey@cluster0.o4h7fmj.mongodb.net/test", {useNewUrlParser: true})

const item1 = new Item({
    name: "Welcome to your todo list"
})

const defaultItems = [item1]

app.get('/', (req, res) => {
    Item.find({}, (err, foundItems) => { 
        if(foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err, items) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Items saved to DB successfully");
                } 
            })  
            res.redirect('/')
        } else {
            res.render("list", {kindOfDay: "Today", newListItems: foundItems})
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})  

app.post('/', (req, res) => {
    let itemName = req.body.newItem 
    const item = new Item({
        name: itemName
    })
    item.save()

    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox
    Item.findByIdAndRemove(checkedItemId, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Deleted " + checkedItemId);
            res.redirect('/')
        }
    }) 
})

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
})