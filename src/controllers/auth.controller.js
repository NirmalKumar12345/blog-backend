import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Password and confirm Password does not match" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email Already Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
        const user = await User.create({ email, password: hashedPassword, confirmPassword: hashedConfirmPassword });
        res.status(201).json({ msg: "Signup SuccessFully", user });

    }
    catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

export const Login = async (req, res) => {
    try {
      const {email,password}=req.body;
      const user = await User.findOne({email});
      if(!user) return res.status(401).json({ msg: "User Not found" });
      if(!user.password) return res.status(400).json({ msg: "Invalid Password" });
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch) return res.status(400).json({ msg: "Invalid Creadential" });
      const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
        expiresIn: process.env.EXPIRATION_TIME
      });
      res.status(201).json({msg: "Login SuccessFully",token})
    }
    catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}