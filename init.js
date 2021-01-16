import app from "./app";

const PORT = 4000;

const handleListening = () => console.log(`🎴 Listening on: http://localhot:${PORT}`);

app.listen(PORT, handleListening);