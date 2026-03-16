/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `channel` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Channel_userId_key` ON `Channel`(`userId`);

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
