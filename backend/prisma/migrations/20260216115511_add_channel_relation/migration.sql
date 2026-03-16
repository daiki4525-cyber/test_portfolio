/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `channel` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `stream` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `stream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `channel` DROP COLUMN `iconUrl`,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `stream` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
