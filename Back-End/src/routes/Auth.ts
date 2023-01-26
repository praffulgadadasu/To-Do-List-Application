import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const auth = Router();
const prism = new PrismaClient();
import { getUsers, getUserbyId, createUser, deleteUser, updateUser } from '../controllers/controller'

/* auth.post("/login", async (req, res)=>{
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
            .send(user);
        }else{
            return res
            .status(400)
            .send({ success:false,error:"Invalid Credentials !" });
        }
    }catch(err){
        return res
        .status(400)
        .send({success: false, error:"Internal Server Error"});
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
        .send({ sucess: false, error:"User Already Exists!"});
    }
    const user = await prism.user.create({
        data: {
            email : email,
            username: username,
            password: password,
        },
    }).then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the User"
        })
    });
    return res.status(200).send(user);
    //return res.status(200).send({ success:true, accessToken: acessToken });
}); */

auth.get('/users', getUsers);
auth.get('/users/:id', getUserbyId);
auth.post('/users', createUser);
auth.put('/users/:id', updateUser);
auth.delete('/users/:id', deleteUser);


export default auth;

