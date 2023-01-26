import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const auth = Router();
const prism = new PrismaClient();

auth.post("/login", async (req, res)=>{
    const { username, email, password } = req.body;
    const user = await prism.user.findUnique({
        where:{
            username: username,
        },
    });
    if(!user){
        return res.status(400).json({ success:false, error:"User not found!"});
    }
    try{
        if( email == user.email && password == user.password){
            const acessToken = jwt.sign({ userId: user.id}, "secret");
            return res
            .status(200)
            .json({ success: true, accessToken: acessToken });
        }else{
            return res
            .status(400)
            .json({ success:false,error:"Invalid Credentials !" });
        }
    }catch(err){
        return res
        .status(400)
        .json({success: false, error:"Internal Server Error"});
    }
});
auth.post("/register", async (req, res)=>{
    const { email, username, password } = req.body;
    const result = await prism.user.findUnique({
        where:{
            username: username,
        },
    });
    if (result){
        return res
        .status(400)
        .json({ sucess: false, error:"User Already Exists!"});
    }
    const user = await prism.user.create({
        data: {
            email : email,
            username: username,
            password: password,
        },
    });

    const acessToken = jwt.sign({ userId: user.id}, "secret");
    return res.status(200).json({ success:true, accessToken: acessToken });
});