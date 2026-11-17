import axios from "axios";

export const englishToHindi = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter text."
            });
        }

        const response = await axios.get(
            "https://api.mymemory.translated.net/get",
            {
                params: {
                    q: text,
                    langpair: "en|hi"
                }
            }
        );

        const translatedText =
            response.data.responseData.translatedText;

        res.status(200).json({
            success: true,
            originalText: text,
            translatedText: translatedText
        });

    } catch (error) {

        console.error("Translation Error:", error.message);

        res.status(500).json({
            success: false,
            message: "English to Hindi translation failed.",
            error: error.message
        });
    }
};

//hindi to english
export const hindiToEnglish = async (req,res) => {
    try {
        const {text} = req.body;
        if (!text || !text.trim()){
            return res.status(400).json({
                success:false,
                message:"please enter some text."
            });
        }
        const response = await axios.get(
            "https://api.mymemory.translated.net/get", 
            {
                params: {
                    q:text,
                    langpair : "hi|en"
                },
                timeout: 15000
            }
        );
        res.status(200).json({
            success:true,
            originalText: text,
            translatedText:
            response.data.responseData.translatedText
        });
    }catch (error){
            console.error("hindi to english error:", error.message);
            res.status(500).json({
                success:false,
                message:"hindi to english translation failed"
            });
        }
    };

