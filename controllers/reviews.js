const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')

// displays the page to write a new review
router.get('/new', (req,res)=>{
    if (req.query.user_id === null){
        console.log("you have to log in first luv!");
        res.render('main/404')
    }
    else{
        let anime_id = req.query.anime_id
        res.render('reviews.ejs', {anime_id})
    }
    
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
    rev_Id = req.params.r_id
     db.review.update({
        title: req.body.title,
        content: req.body.content
     },
     {  where: {
        id: req.params.r_id
     }
    })
    .then((review) => {
    res.render('details.js', {reviews: review, rev_Id})
    })
    .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
    })

    res.redirect('/users/userReviews')
})

//Delete the review
router.delete('/delete/:r_id', (req, res)=>{
    rev_Id = req.params.r_id
    db.review.destroy({
        where: {
            id: req.params.r_id
        }
    })
    .then((review) => {
    res.render('users/userReviews', {reviews: review, rev_Id})
    })
    .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
    })
    res.redirect('/users/userReviews')
})

module.exports = router