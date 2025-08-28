/*
  Warnings:

  - You are about to alter the column `birthdate` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `comments` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `notes` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `publications` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` MODIFY `birthdate` DATETIME NOT NULL;
