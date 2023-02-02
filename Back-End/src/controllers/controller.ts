import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import { Buffer } from 'buffer';



/* export const getUser = async (req: Request, res: Response): Promise<Response> => {
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
            return res
                .status(401)
                .json({ success: false, error: "Unauthorised User!" });
        }
        //authenticatedUser.password = "".padStart(authenticatedUser.password.length, '*')
        return res.send(authenticatedUser);
    } catch (e) {
        return res
            .status(401)
            .json({ success: false, error: "User not Authorized!" });
    }
} */


export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await prisma.userstable.findFirst({
        where: {
            AND: [
                {
                    email: {
                        equals: req.body.email 
                    }
                },
                {
                    role: {
                        equals: req.body.role
                    }
                },
            ],
        },
    });
    if (!user)
        return res.status(400).json({ success: false, error: "User not found" });

    else {
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid Credentials!" });
        }
        else {
            const token = jwt.sign({ _id: user.id.toString(), username: user.username.toString(), email: user.email.toString(), role: user.role.toString() }, "secret", { expiresIn: "1h" })
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                secure: true
            });
            return res.send({
                message: "success", token
            })
        }
    }
}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = await prisma.userstable.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role 
        },
    });
    return res.status(200).send(user);
}

/* export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    res.cookie('jwt', '', { maxAge: 0 })
    return res.send({
        message: "success"
    })
}
 */


/* export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    try{
        const response = await prism.$queryRaw`SELECT * FROM userstable`;
        return res.status(200).json(response);
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
}

export const getUserbyId = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prism.$queryRaw`SELECT * FROM userstable WHERE id = ${id}`;
    return res.json(response);
}

export const createUser = async ( req: Request, res: Response ): Promise<Response> => {
    const { username, email, password } = req.body;
    const response =  await prism.$queryRaw`INSERT INTO userstable (username, email, password) VALUES(${username}, ${email}, ${password})`;
    return res.json({
        message: 'User created successfully!',
        body: {
            user:{
                username,
                email,
                password
            }
        },
    });
}

export const updateUser = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { username, email, password } = req.body;
    await prism.$queryRaw`UPDATE userstable SET username = ${username}, email = ${email}, password = ${password} WHERE id = ${id}`;
    return res.json(`User ${id} updated successfully!`);
}

export const deleteUser = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prism.$queryRaw`DELETE FROM "userstable WHERE id = ${id}`;
    return res.json(`User ${id} deleted successfully!`);
}
 */



export const getData = async (req: Request, res: Response): Promise<Response> =>{
    /* function parseJwt(token: string) {
        var base64Payload = token.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }
    const token = localStorage.getItem('token');
    if (token == null) {
      return res.status(500).json('Internal Server Error');
    }
    let payload= parseJwt(token);
    const email = payload.email; */
    try{
        const response = await prisma.$queryRaw`SELECT * FROM "ToDoList"`;
        return res.status(200).json(response);
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
}

export const getDatabyId = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prisma.$queryRaw`SELECT * FROM "ToDoList" WHERE id = ${id}`;
    return res.json(response);
}

export const createData = async ( req: Request, res: Response ): Promise<Response> => {
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.body.userId;

    const response =  await prisma.$queryRaw`INSERT INTO "ToDoList" ("title", "description", "userId") VALUES(${title}, ${description}, ${userId})`;
    return res.json({
        message: 'To-Do List created successfully!',
        body: {
            data:{
                title,
                description,
                userId
            }
        }
    });
}

export const updateData = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id);
    const data = req.body.to_do_list;
    await prisma.$queryRaw`UPDATE "ToDoList" SET ToDoList = ${data} WHERE id = ${id}`;
    return res.json(`To-Do List ${id} updated successfully!`);
}

export const deleteData = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prisma.$queryRaw`DELETE FROM "ToDoList" WHERE id = ${id}`;
    return res.json(`To-Do List ${id} deleted successfully!`);
}