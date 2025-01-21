import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
const router = express.Router();

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes);
app.get('/api/tickets', async (req, res) => {
  try {
    // On utilise la méthode `find()` pour récupérer tous les documents de la collection
    const tickets = await mongoose.connection.db.collection('eatgreenynov-tickets').find().toArray();
    res.json(tickets);
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets:', error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des tickets" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
