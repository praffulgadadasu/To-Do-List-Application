import { User, ToDoListTable } from "@prisma/client";
export{};
declare global{
    namespace Express {
        interface Request{
            User?: User;
            ToDoListTable?: ToDoListTable;
        }
    }
}