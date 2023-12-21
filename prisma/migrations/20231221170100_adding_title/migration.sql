/*
  Warnings:

  - Added the required column `title` to the `licenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "licenses" ADD COLUMN     "title" TEXT NOT NULL;
