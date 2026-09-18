const express = require("express")
const router = express.Router()
const upload = require("../middlewares/upload.middleware")
const songController = require("../controller/song.controller")

//POST -/api/songs/
router.post("/",upload.single("song"),songController.uploadSongController)


//GET -/api/songs/
//get song by mood
router.get("/",songController.getSong)

//GET -/api/songs/
//get all songs
router.get("/all",songController.getAllSongs)

module.exports = router