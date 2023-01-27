-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'student', 'teacher', 'stuff', 'beneficiary');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_uid_key" ON "user"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
