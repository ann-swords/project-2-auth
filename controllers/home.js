const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')


router.get('/', (req, res)=>{
    let animeUrl = `https://api.jikan.moe/v4/seasons/now`;
    // Use request to call the API
    axios.get(animeUrl)
    .then(apiResponse => {
        let anime = apiResponse.data.data
    //   console.log(apiResponse.data.data)
      res.render('home.ejs', {animeRec: anime} )
    })
    .catch(err=>res.send(err))
    })

    router.get('/results', (req, res)=>{
        let animeUrl = `https://api.jikan.moe/v4/anime?q=${req.query.searchAnime}`
        // Use request to call the API
        axios.get(animeUrl)
        .then(apiResponse => {
            let anime = apiResponse.data.data
            console.log(apiResponse.data.data)
            res.render('results.ejs', {animeRec: anime})
        })
        .catch(err=>res.send(err))
        })




module.exports = router

