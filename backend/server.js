import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import translateRoutes from "./routes/translateRoutes.js"
dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/translate", translateRoutes);

app.get("/", (req,res) => {
    res.json({
        message:"TRANSO backend is running successfully!"
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`TRANSO server running on port ${PORT}`);
})