import { createContext, useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/7wuftbj1si/cohort-2/moodify/songs/Baby_John_-_Beast_Mode__From__Baby_John___gi7iwj-6-.mp3",
    posterUrl:
      "https://ik.imagekit.io/7wuftbj1si/cohort-2/moodify/posters/Baby_John_-_Beast_Mode__From__Baby_John___Y1I9hwVaM.jpg",
    title: 'Baby John - Beast Mode (From "Baby John")',
    mood: "happy",
  });

  const [songs, setSongs] = useState([])
  const [loading,setLoading] = useState(false)
  return (
    <songContext.Provider value={{ song, setSong, songs, setSongs, loading, setLoading }} >
      {children}
    </songContext.Provider>
  );
};

