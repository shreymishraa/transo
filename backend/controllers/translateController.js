import axios from "axios";

// English to Hindi
export const englishToHindi = async (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter English text."
      });
    }

    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q: text.trim(),
          langpair: "en|hi"
        },
        timeout: 15000
      }
    );

    if (response.data.responseStatus !== 200) {
      return res.status(502).json({
        success: false,
        message: response.data.responseDetails || "Translation failed."
      });
    }

    return res.status(200).json({
      success: true,
      originalText: text,
      translatedText: response.data.responseData.translatedText
    });

  } catch (error) {
    console.error("English-Hindi error:", error.message);

    return res.status(500).json({
      success: false,
      message: "English to Hindi translation failed."
    });
  }
};


// Hindi to English
export const hindiToEnglish = async (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter Hindi text."
      });
    }

    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q: text.trim(),
          langpair: "hi|en"
        },
        timeout: 15000
      }
    );

    if (response.data.responseStatus !== 200) {
      return res.status(502).json({
        success: false,
        message: response.data.responseDetails || "Translation failed."
      });
    }

    return res.status(200).json({
      success: true,
      originalText: text,
      translatedText: response.data.responseData.translatedText
    });

  } catch (error) {
    console.error("Hindi-English error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Hindi to English translation failed."
    });
  }
};