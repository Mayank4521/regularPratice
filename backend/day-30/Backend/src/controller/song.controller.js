const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSongController(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "cohort-2/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpg",
      folder: "cohort-2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({ message: "Song created successfully", song });
}

async function getSong(req,res){
    const {mood} = req.query
    const song = await songModel.findOne({mood})

    res.status(200).json({
        message:"Song fetched successfully",
        song
    })
}

async function getAllSongs(req,res){
  const {mood} = req.query
  const songs = await songModel.find({mood})

  res.status(200).json({
    message:"Songs fetched successfully",
    songs
  })
}

module.exports = {
  uploadSongController,
  getSong,
  getAllSongs
};
