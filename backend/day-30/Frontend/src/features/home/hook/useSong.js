import { useContext } from "react";
import {getSong, getAllSongs} from "../service/song.api"
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext)

    const {song,setSong,songs,setSongs,loading,setLoading} = context

    const handleGetSong = async({mood})=>{
        setLoading(true)
        const data = await getSong({mood})
        setSong(data.song)
        setLoading(false)
    }

    const handleGetAllSongs = async({mood})=>{
        setLoading(true)
        const data = await getAllSongs({mood})
        setSongs(data.songs)
        setLoading(false)
    }

    return ( {loading,song,songs,setSong,handleGetSong,handleGetAllSongs} )
}