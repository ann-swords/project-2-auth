const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')


//Show anime details
router.get('/:anime_id', (req, res)=>{
    let animeUrl = `https://api.jikan.moe/v4/anime/${req.params.anime_id}`
    // Use request to call the API
    axios.get(animeUrl)
    .then(apiResponse => {
        let anime = apiResponse.data.data
        console.log("The RESULT::: ",apiResponse.data.data)
        res.render('details.ejs', {animeRec: anime})
    })
    .catch(err=>res.send(err))
})


//Add a new review to the anime page
router.post('/:anime_id', (req, res)=>{
    db.review.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body
        
    })
    .then((post) => {
            res.redirect(`/details/${req.params.anime_id}`)
        })
    .catch((error) => {
    res.status(400).render('main/404')
    })
})


module.exports = router