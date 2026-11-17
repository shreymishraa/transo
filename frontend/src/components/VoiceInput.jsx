import React, { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";

function VoiceInput({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("hi-IN");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);
  const languageRef = useRef("hi-IN");
  const onTranscriptRef = useRef(onTranscript);

  // Keep latest callback
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  // Start voice recognition
  const startListening = (selectedLanguage) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    if (
      shouldListenRef.current &&
      languageRef.current === selectedLanguage
    ) {
      return;
    }

    setError("");

    languageRef.current = selectedLanguage;
    shouldListenRef.current = true;
    setLanguage(selectedLanguage);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    createRecognition(SpeechRecognition);
  };

  // Create recognition session
  const createRecognition = (SpeechRecognition) => {
    if (!shouldListenRef.current) return;

    const recognition = new SpeechRecognition();

    recognition.lang = languageRef.current;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    // Get recognized speech
    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + " ";
        }
      }

      if (transcript.trim()) {
        onTranscriptRef.current(transcript.trim());
      }
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setError("Please allow microphone permission.");
        shouldListenRef.current = false;
      } else if (event.error === "network") {
        setError("Network error. Check your connection.");
        shouldListenRef.current = false;
      } else if (event.error !== "no-speech") {
        setError("Voice recognition failed. Please try again.");
        shouldListenRef.current = false;
      }

      setListening(false);
    };

    // Automatically restart recognition
    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }

      if (shouldListenRef.current) {
        setTimeout(() => {
          if (shouldListenRef.current && !recognitionRef.current) {
            createRecognition(SpeechRecognition);
          }
        }, 300);
      } else {
        setListening(false);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error(error);
      setError("Unable to start voice recognition.");
      shouldListenRef.current = false;
      setListening(false);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      shouldListenRef.current = false;

      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

  // Reusable circular indicator
  const RadioIndicator = ({ selected }) => (
    <span
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        selected ? "border-white" : "border-purple-700"
      }`}
    >
      {selected && (
        <span className="w-2.5 h-2.5 rounded-full bg-white" />
      )}
    </span>
  );

  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-4">

      {/* Microphone Heading */}
      <div className="flex items-center gap-3 text-xl font-bold text-black">
        <Mic size={25} />
        <span>Speak:</span>
      </div>

      {/* Hindi Button */}
      <button
        onClick={() => startListening("hi-IN")}
        className={`
          flex items-center justify-center gap-3
          min-w-[165px] px-6 py-4
          rounded-2xl border-2
          text-xl font-semibold
          transition duration-200
          ${
            language === "hi-IN"
              ? "bg-purple-800 text-white border-purple-800"
              : "bg-white text-black border-purple-200 hover:bg-purple-100"
          }
        `}
      >
        <RadioIndicator selected={language === "hi-IN"} />
        Hindi
      </button>

      {/* English Button */}
      <button
        onClick={() => startListening("en-US")}
        className={`
          flex items-center justify-center gap-3
          min-w-[165px] px-6 py-4
          rounded-2xl border-2
          text-xl font-semibold
          transition duration-200
          ${
            language === "en-US"
              ? "bg-purple-800 text-white border-purple-800"
              : "bg-white text-black border-purple-200 hover:bg-purple-100"
          }
        `}
      >
        <RadioIndicator selected={language === "en-US"} />
        English
      </button>

      {/* Listening Status */}
      {listening && (
        <p className="w-full text-right text-sm text-purple-700 font-semibold">
          Listening...
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="w-full text-right text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}

export default VoiceInput;