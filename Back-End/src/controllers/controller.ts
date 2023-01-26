import { Request, Response } from "express";
import { prisma, PrismaClient } from "@prisma/client";
const prism = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    try{
        const response = await prism.$queryRaw`SELECT * FROM "User"`;
        return res.status(200).json(response);
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
}

export const getUserbyId = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prism.$queryRaw`SELECT * FROM "User" WHERE id = ${id}`;
    return res.json(response);
}

export const createUser = async ( req: Request, res: Response ): Promise<Response> => {
    const { username, email, password } = req.body;
    const response =  await prism.$queryRaw`INSERT INTO "User" (username, email, password) VALUES(${username}, ${email}, ${password})`;
    return res.json({
        message: 'User created successfully!',
        body: {
            user:{
                username,
                email,
                password
            }
        }
    });
}

export const updateUser = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { username, email, password } = req.body;
    await prism.$queryRaw`UPDATE "User" SET username = ${username}, email = ${email}, password = ${password} WHERE id = ${id}`;
    return res.json(`User ${id} updated successfully!`);
}

export const deleteUser = async ( req: Request, res: Response ): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prism.$queryRaw`DELETE FROM "User" WHERE id = ${id}`;
    return res.json(`User ${id} deleted successfully!`);
}