import { useEffect, useRef, useState } from "react";
import { useSong } from "../hook/useSong";
import "../style/player.scss";

const Player = () => {
  const audioRef = useRef(null);
  const { song } = useSong();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.load();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [song?.url]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      audio.duration || 0,
    );
  };

  const handleSpeedChange = (event) => {
    const speed = Number(event.target.value);
    setPlaybackRate(speed);

    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <section className="player" aria-label="Audio player">
      <div className="player__track">
        <img className="player__artwork" src={song?.posterUrl} alt="" />
        <div>
          <p className="player__eyebrow">Now playing</p>
          <h2>{song?.title || "Choose a song"}</h2>
          <span>{song?.mood || "Your soundtrack"}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song?.url}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player__timeline">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          aria-label="Song progress"
          onChange={(event) => {
            const time = Number(event.target.value);
            setCurrentTime(time);
            if (audioRef.current) audioRef.current.currentTime = time;
          }}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="player__controls">
        <button type="button" onClick={() => skip(-5)} aria-label="Back 5 seconds">
          <span aria-hidden="true">↺</span>
        </button>
        <button
          className="player__play"
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause song" : "Play song"}
        >
          {isPlaying ? "ⅠⅠ" : "▶"}
        </button>
        <button type="button" onClick={() => skip(5)} aria-label="Forward 5 seconds">
          <span aria-hidden="true">↻</span>
        </button>
        <label className="player__speed">
          <span>Speed</span>
          <select value={playbackRate} onChange={handleSpeedChange}>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default Player;