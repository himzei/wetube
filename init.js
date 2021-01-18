import "./db"
import app from "./app";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`🎴 Listening on: http://localhot:${PORT}`);

app.listen(PORT, handleListening);