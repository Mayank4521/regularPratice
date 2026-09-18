import { createContext, useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/7wuftbj1si/cohort-2/moodify/songs/Pikley_Pom__From__Baby_John___9rf3KiWtW.mp3",
    posterUrl:
      "https://ik.imagekit.io/7wuftbj1si/cohort-2/moodify/posters/Pikley_Pom__From__Baby_John___4R9iVz8it.jpg",
    title: 'Pikley Pom (From "Baby John")',
    mood: "happy",
  });

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <songContext.Provider
      value={{ song, setSong, songs, setSongs, loading, setLoading }}
    >
      {children}
    </songContext.Provider>
  );
};
