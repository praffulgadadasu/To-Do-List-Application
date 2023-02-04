import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
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
            const token = jwt.sign({ _id: user.id, email: user.email, username: user.username, role: user.role}, "secret", { expiresIn: "1h" })
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


export const getData = async (req: Request, res: Response): Promise<Response> => {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, "secret") as JwtPayload;
      console.log(decodedToken)
      const userId = decodedToken._id;
      const todoLists = await prisma.toDoList.findMany({
        where: {
          user: {
            id: userId
          }
        }
      });
      console.log(todoLists)
      return res.status(200).json(todoLists);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };


export const getDatabyId = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prisma.$queryRaw`SELECT * FROM "ToDoList" WHERE id = ${id}`;
    return res.json(response);
}

export const createData = async (req: Request, res: Response): Promise<Response> => {
    const title = req.body.title;
    const description = req.body.description;
    const userEmail = req.body.userEmail;
    try {
        const userExists = await prisma.userstable.findUnique({ where: { email: userEmail } });
        console.log(userExists);
        if (!userExists) {
            throw new Error(`User with ID ${userEmail} does not exist`);
        }
        const response = await prisma.$queryRaw`INSERT INTO "ToDoList" ("title", "description", "userEmail") VALUES(${title}, ${description}, ${userEmail})`;
        return res.json({
            message: 'To-Do List created successfully!',
            body: {
                data: {
                    title,
                    description,
                    userEmail
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

export const updateData = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const data = req.body.to_do_list;
    await prisma.$queryRaw`UPDATE "ToDoList" SET ToDoList = ${data} WHERE id = ${id}`;
    return res.json(`To-Do List ${id} updated successfully!`);
}

export const deleteData = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response = await prisma.$queryRaw`DELETE FROM "ToDoList" WHERE id = ${id}`;
    return res.json(`To-Do List ${id} deleted successfully!`);
}