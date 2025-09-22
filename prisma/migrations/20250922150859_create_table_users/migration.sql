/*
  Warnings:

  - Added the required column `nim` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "email" SET DATA TYPE TEXT,
DROP COLUMN "nim",
ADD COLUMN     "nim" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_nim_key" ON "public"."users"("nim");
