/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `source` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stream` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `externalId` VARCHAR(191) NULL,
    ADD COLUMN `isLive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `source` ENUM('YOUTUBE', 'INTERNAL') NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL,
    ADD COLUMN `viewerCount` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RefreshToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
