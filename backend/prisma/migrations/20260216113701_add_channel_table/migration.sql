/*
  Warnings:

  - Made the column `channelId` on table `stream` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `stream` DROP FOREIGN KEY `Stream_channelId_fkey`;

-- AlterTable
ALTER TABLE `stream` MODIFY `channelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Stream` ADD CONSTRAINT `Stream_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
