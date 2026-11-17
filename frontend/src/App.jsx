import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TextEditor from "./components/TextEditor";
import VoiceInput from "./components/VoiceInput";
function App() {
  const [text, setText] = useState("");
  // Translation API
  const handleTranslate = async (language) => {
  if (!text.trim()) {
    alert("Please enter some text.");
    return;
  }

  try {
    const endpoint =
      language === "en-hi"
        ? "english-hindi"
        : "hindi-english";

    const response = await axios.post(
      `http://localhost:5001/api/translate/${endpoint}`,
      { text },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.success) {
      setText(response.data.translatedText);
    } else {
      alert(response.data.message || "Translation failed.");
    }

  } catch (error) {
    console.error("Translation error:", error.response?.data || error.message);

    alert(
      error.response?.data?.message ||
      "Unable to translate. Check your backend server and internet connection."
    );
  }
};
  // Handle Sidebar Actions
  const handleAction = (action) => {
    switch (action) {
      case "uppercase":
        setText((prev) => prev.toUpperCase());
        break;
      case "lowercase":
        setText((prev) => prev.toLowerCase());
        break;
      case "capital":
        setText((prev) =>
          prev.toLowerCase().replace(/\b\w/g, (char) =>
            char.toUpperCase()
          )
        );
        break;
      case "sentence":
        setText((prev) =>
          prev.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (char) =>
            char.toUpperCase()
          )
        );
        break;
      case "en-hi":
        handleTranslate("en-hi");
        break;
      case "hi-en":
        handleTranslate("hi-en");
        break;
      default:
        break;
    }
  };
  // Handle Voice Input
  const handleTranscript = (transcript) => {
    setText((prev) =>
      prev ? prev + " " + transcript : transcript
    );
  };
  return (
    <div className="min-h-screen w-full bg-[#F7F5FF]">
      <Navbar />
      <div className="flex items-start gap-6 p-4 md:p-6">
        <Sidebar onAction={handleAction} />
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="flex justify-end items-center mb-6">
            <VoiceInput onTranscript={handleTranscript} />
          </div>
          <TextEditor
            text={text}
            setText={setText}
          />
        </main>
      </div>
    </div>
  );
}


export default App;