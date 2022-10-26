const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')


//Show the anime details and its reviews
router.get('/:anime_id', (req, res)=>{
    let animeUrl = `https://api.jikan.moe/v4/anime/${req.params.anime_id}`
    axios.get(animeUrl)
    .then(apiResponse => {
        let anime = apiResponse.data.data
        // console.log("The RESULT::: ",apiResponse.data.data)
        db.review.findAll({
            where:{
                animeId: req.params.anime_id
            }
        })
        .then((review) => {
        res.render('details.ejs', {reviews: review,  animeRec: anime})
        })
        .catch((error) => {
        res.status(400).render('main/404')
        })
    })
    .catch(err=>res.send(err))

    
})


//Add a new review to the anime page
router.post('/:anime_id', (req, res)=>{
    db.review.create({
        title: req.body.userName,
        content: req.body.content,
        userId: req.body.user_id,
        animeId: req.params.anime_id,
        include: [db.user, db.anime]
    })
    .then((post) => {
            res.redirect(`/details/${req.params.anime_id}`)
        })
    .catch((error) => {
    res.status(400).render('main/404')
    })
})


module.exports = router