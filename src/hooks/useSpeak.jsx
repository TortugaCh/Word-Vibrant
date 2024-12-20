import { useState, useRef } from "react";

export const useSpeak = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fetch audio only once and store the source
  async function fetchSpeech(text, voice) {
    console.log("fetching audio", text);
    if (!text || audioSrc) return; // Prevent re-fetching if audio is already fetched
    setLoadingAudio(true);
    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });
      const data = await response.json();

      if (data.audioContent) {
        const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;
        setAudioSrc(audioUrl);

        // Initialize the audio instance
        audioRef.current = new Audio(audioUrl);
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setLoadingAudio(false);
    }
  }

  // Function to play the audio
  function playAudio() {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);

      // Handle when audio ends
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }

  // Function to pause the audio
  function pauseAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  // Toggle between play and pause
  //   function togglePlayback() {
  //     if (isPlaying) {
  //       pauseAudio();
  //     } else if (audioSrc) {
  //       playAudio();
  //     } else {
  //       fetchSpeech();
  //     }
  //   }

  async function togglePlayback(text,voice="cmn-TW-Wavenet-A") {
    if (isPlaying) {
      pauseAudio();
    } else {
      if (!audioSrc || audioRef.current.src !== audioSrc) {
        await fetchSpeech(text,voice);
      }
      playAudio();
    }
  }

  return {
    audioSrc,
    loadingAudio,
    isPlaying,
    togglePlayback,
    fetchSpeech,
  };
};
