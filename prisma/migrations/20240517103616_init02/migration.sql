/*
  Warnings:

  - Added the required column `userId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
