import { PrismaClient } from "@prisma/client";
import { Router } from "express";
export const auth = Router();
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//import { getUsers, getUserbyId, createUser, deleteUser, updateUser } from '../controllers/controller'
//import { getData, getDatabyId, createData, updateData, deleteData } from '../controllers/controller'

/* auth.get('/users', getUsers);
auth.get('/users/:id', getUserbyId);
auth.post('/users', createUser);
auth.put('/users/:id', updateUser);
auth.delete('/users/:id', deleteUser);
 */


auth.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        //verify the token
        const userIdFromJWT = jwt.verify(cookie, 'secret') as { _id: string };
        if (!userIdFromJWT) {
            return res
                .status(401)
                .json({ success: false, error: "Unauthorised User!" });
        }
        //find unique user
        const authenticatedUser = await prisma.userstable.findUnique({
            where: { id: userIdFromJWT._id }
        });
        if (!authenticatedUser) {
            return res.send(authenticatedUser)
        }
        authenticatedUser.password = "".padStart(authenticatedUser.password.length, '*')
        return res.send(authenticatedUser);
    } catch (e) {
        return res
            .status(401)
            .json({ success: false, error: "Unauthorised User!" });
    }
})


auth.post("/login", async (req, res) => {
    const user = await prisma.userstable.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (!user)
        return res.status(400).json({ success: false, error: "User not found" });
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res
            .status(400)
            .json({ success: false, error: "Invalid Credentials!" });
    }
    const token = jwt.sign({ _id: user.id.toString() }, "secret")
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.send({
        message: "success"
    })
});

auth.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = await prisma.userstable.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        },
    });
    return res.status(200).send(user);
});

auth.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: "success"
    })
})

/* auth.get('/todolist', getData);
auth.get('/todolist/:id', getDatabyId);
auth.post('/todolist', createData);
auth.put('/todolist/:id', updateData);
auth.delete('/todolist/:id', deleteData);
 */



