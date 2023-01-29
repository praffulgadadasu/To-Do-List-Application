import { Router } from "express";
const auth = Router();
import { getUsers, getUserbyId, createUser, deleteUser, updateUser } from '../controllers/controller'
import { getData, getDatabyId, createData, updateData, deleteData } from '../controllers/controller'

auth.get('/users', getUsers);
auth.get('/users/:id', getUserbyId);
auth.post('/users', createUser);
auth.put('/users/:id', updateUser);
auth.delete('/users/:id', deleteUser);


auth.get('/todolist', getData);
auth.get('/todolist/:id', getDatabyId);
auth.post('/todolist', createData);
auth.put('/todolist/:id', updateData);
auth.delete('/todolist/:id', deleteData);


export default auth;

