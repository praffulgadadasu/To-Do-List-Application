import { PrismaClient, userstable } from "@prisma/client";
import { Router } from "express";
export const auth = Router();

import { loginUser, registerUser } from "../controllers/controller";

//import { getUsers, getUserbyId, createUser, deleteUser, updateUser } from '../controllers/controller'
import { getData, getDatabyId, createData, updateData, deleteData } from '../controllers/controller'



/* auth.get('/users', getUsers);
auth.get('/users/:id', getUserbyId);
auth.post('/users', createUser);
auth.put('/users/:id', updateUser);
auth.delete('/users/:id', deleteUser);
 */


//auth.get('/user', getUser);
auth.post('/login', loginUser)
auth.post('/register', registerUser);
//auth.post('/logout', logoutUser)




auth.get('/todolist', getData);
auth.get('/todolist/:id', getDatabyId);
auth.post('/todolist', createData);
auth.put('/todolist/:id', updateData);
auth.delete('/todolist/:id', deleteData);


