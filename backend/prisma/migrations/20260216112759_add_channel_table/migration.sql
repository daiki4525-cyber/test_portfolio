/*
  Warnings:

  - You are about to drop the column `createdAt` on the `channel` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `channel` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Channel_externalId_key` ON `channel`;

-- AlterTable
ALTER TABLE `channel` DROP COLUMN `createdAt`,
    DROP COLUMN `externalId`;
