import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: false, unique: true , autoIncrement: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true },
    date_inscription: { type: Date, default: Date.now },
    score: { type: Number, default: 0 },
    chemin_avatar: { type: String }
});

export default mongoose.model("User", userSchema);
