-- CreateTable
CREATE TABLE "ToDoList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ToDoList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToDoList" ADD CONSTRAINT "ToDoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userstable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
