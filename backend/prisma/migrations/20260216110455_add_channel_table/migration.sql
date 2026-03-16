/*
  Warnings:

  - You are about to drop the column `description` on the `stream` table. All the data in the column will be lost.
  - You are about to drop the column `isLive` on the `stream` table. All the data in the column will be lost.
  - You are about to drop the column `viewerCount` on the `stream` table. All the data in the column will be lost.
  - You are about to alter the column `channelId` on the `stream` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[externalId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Stream_isLive_idx` ON `stream`;

-- DropIndex
DROP INDEX `Stream_source_externalId_key` ON `stream`;

-- DropIndex
DROP INDEX `Stream_source_idx` ON `stream`;

-- AlterTable
ALTER TABLE `stream` DROP COLUMN `description`,
    DROP COLUMN `isLive`,
    DROP COLUMN `viewerCount`,
    MODIFY `channelId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Channel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iconUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Channel_externalId_key`(`externalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Stream_externalId_key` ON `Stream`(`externalId`);

-- AddForeignKey
ALTER TABLE `Stream` ADD CONSTRAINT `Stream_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
