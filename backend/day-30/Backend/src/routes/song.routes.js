const express = require("express")
const router = express.Router()
const upload = require("../middlewares/upload.middleware")
const songController = require("../controller/song.controller")

//POST -/api/songs/
router.post("/",upload.single("song"),songController.uploadSongController)

router.get("/",songController.getSong)

module.exports = router