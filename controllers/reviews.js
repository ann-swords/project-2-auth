const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')

// displays the page to write a new review
router.get('/new', (req,res)=>{
    let anime_id = req.query.anime_id
    res.render('reviews.ejs', {anime_id})
})
    

//displays the Edit page 
router.get('/edit/:r_id', (req, res) =>{
    rev_Id = req.params.r_id
    db.review.findOne({
        where: {
            id: req.params.r_id
        }
    })
    .then((review) => {
    res.render('users/editReview.ejs', {reviews: review, rev_Id})
    })
    .catch((error) => {
    res.status(400).render('main/404')
    })
})


//Edit the review content
router.put('/:r_id', (req, res)=>{
    // Add the database things to save the new data into the database.
     //redirect to home page
    res.redirect('/users/userReviews')
})


module.exports = router