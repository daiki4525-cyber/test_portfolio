/*
  Warnings:

  - A unique constraint covering the columns `[source,externalId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stream` DROP FOREIGN KEY `Stream_userId_fkey`;

-- AlterTable
ALTER TABLE `stream` ADD COLUMN `channelId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `userId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Stream_isLive_idx` ON `Stream`(`isLive`);

-- CreateIndex
CREATE INDEX `Stream_source_idx` ON `Stream`(`source`);

-- CreateIndex
CREATE UNIQUE INDEX `Stream_source_externalId_key` ON `Stream`(`source`, `externalId`);

-- AddForeignKey
ALTER TABLE `Stream` ADD CONSTRAINT `Stream_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
