import React, { useState } from "react";
import { Eraser, Copy } from "lucide-react";

function TextEditor({ text, setText }) {

  const [copyMessage, setCopyMessage] = useState("");

  // Erase all text
  const handleErase = () => {
    setText("");
    setCopyMessage("");
  };

  // Copy text to clipboard
  const handleCopy = async () => {

    if (!text.trim()) {
      setCopyMessage("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("Text copied successfully!");

    } catch (error) {
      console.error("Copy error:", error);
      setCopyMessage("Unable to copy text!");
    }
  };

  return (
    <div className="w-full min-w-0 flex flex-col">

      {/* Main Text Area */}
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setCopyMessage("");
        }}
        placeholder="Type, paste or speak your text here..."
        className="
          w-full
          h-[480px]
          p-7
          border-2
          border-purple-600
          rounded-[20px]
          bg-white
          text-xl
          text-gray-900
          placeholder:text-gray-500
          outline-none
          focus:border-purple-800
          resize-none
          shadow-sm
        "
      />

      {/* Character Counter */}
      <div className="text-gray-600 text-sm mt-2">
        Characters: {text.length}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-5 mt-5 flex-wrap">

        {/* Erase Button */}
        <button
          onClick={handleErase}
          className="
            flex items-center justify-center gap-3
            min-w-[195px]
            px-6 py-4
            border-2 border-purple-600
            rounded-2xl
            bg-white
            text-black text-lg font-semibold
            hover:bg-purple-100
            transition duration-200
          "
        >
          <Eraser size={22} />
          Erase
        </button>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="
            flex items-center justify-center gap-3
            min-w-[220px]
            px-6 py-4
            rounded-2xl
            bg-purple-800
            text-white text-lg font-semibold
            hover:bg-purple-900
            transition duration-200
          "
        >
          <Copy size={22} />
          Copy Text
        </button>

      </div>

      {/* Copy Message */}
      {copyMessage && (
        <p className="text-right text-sm text-purple-700 mt-3">
          {copyMessage}
        </p>
      )}

    </div>
  );
}

export default TextEditor;