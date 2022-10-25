const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')

router.get('/new', (req,res)=>{
    let anime_id = req.query.anime_id
    res.render('reviews.ejs', {anime_id})
})
    
module.exports = router