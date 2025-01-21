import User from "../schema/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const createUser = async (userData) => {
    try {
        const salt = await bcrypt.genSalt(10);
        userData.mot_de_passe = await bcrypt.hash(userData.mot_de_passe, salt);
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

const loginUser = async (userData) => {
    try {
        const { mail, mot_de_passe } = userData;
        const user = await User.findOne({ mail });

        if (!user) throw new Error("User not found");

        const passwordMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!passwordMatch) throw new Error("Incorrect password");

        const token = generateAuthToken(user);

        return { user, token };
    } catch (error) {
        return { error: error.message };
    }
};

const updateUser = async (userData) => {
    try {
        const { user_id, nom, prenom, mail, mot_de_passe, chemin_avatar, score } = userData;
        const user = await User.findById(user_id);

        if (!user) throw new Error("User not found");

        if (mot_de_passe) {
            const salt = await bcrypt.genSalt(10);
            userData.mot_de_passe = await bcrypt.hash(mot_de_passe, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { nom, prenom, mail, mot_de_passe, chemin_avatar, score },
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        throw new Error("Update failed: " + error.message);
    }
};

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

export { createUser, loginUser, updateUser, generateAuthToken };
