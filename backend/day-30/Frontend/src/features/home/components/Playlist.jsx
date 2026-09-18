import { useSong } from "../hook/useSong";
import "../style/playlist.scss";

const Playlist = () => {
  const {song , songs, setSong } = useSong();


  return (
    <aside className="playlist" aria-label="Mood playlist">
      <div className="playlist__heading">
        <div>
          <p className="playlist__eyebrow">Your mood mix</p>
          <h2>{song?.mood || "No mood detected"}</h2>
        </div>
        <span>{songs.length} songs</span>
      </div>

      {songs.length > 0 ? (
        <div className="playlist__songs">
          {songs.map((playlistSong) => (
            <button
              className={`playlist__song${song?.url === playlistSong.url ? " is-active" : ""}`}
              key={playlistSong._id || playlistSong.url}
              type="button"
              onClick={() => setSong(playlistSong)}
            >
              <img src={playlistSong.posterUrl} alt="" />
              <span className="playlist__song-info">
                <strong>{playlistSong.title}</strong>
                <small>{playlistSong.mood}</small>
              </span>
              <span className="playlist__play" aria-hidden="true">
                {song?.url === playlistSong.url ? "Now" : "Play"}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="playlist__empty">Detect an expression to build your playlist.</p>
      )}
    </aside>
  );
};

export default Playlist;