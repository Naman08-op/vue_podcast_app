const express = require('express')
const {addUser, getUser, getPodcaster, startPodcast, getSessions, joinSession, endSession}= require ('../controllers/userController')
const router = express.Router();
router.post('/signup',addUser)
router.get('/user/:userID',getUser)
router.get('/podcaster',getPodcaster)
router.post('/startPodcast',startPodcast)
router.get('/getSessions',getSessions)
router.post('/joinSession',joinSession)
router.post('/endSession',endSession)
module.exports={
    routes: router
}