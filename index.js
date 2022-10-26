const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
const moment = require('moment')
const methodOverride = require('method-override')
require('dotenv').config()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
    res.locals.moment = moment
    next()
  })

// AUTHENTICATION MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        const user = await db.user.findByPk(decryptedIdString)
        res.locals.user = user
    } else res.locals.user = null
    next()
})

// CONTROLLERS
app.use('/users', require('./controllers/users'))
app.use('/', require('./controllers/home'))
app.use('/details', require('./controllers/details'))
app.use('/reviews', require('./controllers/reviews'))

// ROUTES
// app.get('/', (req, res)=>{
//     res.render('home')
// })

app.listen(3000, ()=>{
    console.log('Project 2 Express Authentication')
})