import React from 'react'
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import Playlist from "../components/Playlist";
import "../style/home.scss"
import {useSong} from "../hook/useSong"

const Home = () => {

  const {handleGetSong, handleGetAllSongs} = useSong()

  return (
    <main className="home-page">
      <div className="home-page__workspace">
        <FaceExpression
          onClick={(expression) => { handleGetSong({ mood: expression }) 
          handleGetAllSongs({ mood: expression })}}
        />
        <Playlist />
      </div>
      <Player />
    </main>
  )
}

export default Home