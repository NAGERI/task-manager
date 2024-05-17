-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DONE', 'OPEN', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(50),
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
