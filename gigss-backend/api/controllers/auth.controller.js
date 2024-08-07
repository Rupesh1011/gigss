import User from "../models/user.model.js"
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";  


export const register = async (req,res,next) =>{
    
    try {
        const hash = bcrypt.hashSync(req.body.password,5)
        const newUser = new User({
            ...req.body,
            password:hash, 
        }) 

        await newUser.save();
        res.status(201).send("User has been created.")
        
    } catch (err) { 
        next(err);
    } 

};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
    
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong username or password!"));

        const { password, ...info } = user._doc;

        const token = jwt.sign(
            { id: info._id, isSeller: info.isSeller },
            process.env.JWT_KEY,
            { expiresIn: "1h" }  // You can set an expiration time for better security
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        }).status(200).send(info);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const logout = async(req,res) =>{
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure: true,
    })
    .status(200).send("User has been logged out.")
}
