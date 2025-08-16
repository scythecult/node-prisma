/*
  Warnings:

  - You are about to alter the column `birthdate` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_publication_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `publications` DROP FOREIGN KEY `publications_user_id_fkey`;

-- DropIndex
DROP INDEX `comments_publication_id_fkey` ON `comments`;

-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `notes` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `publications` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` MODIFY `birthdate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publications` ADD CONSTRAINT `publications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_publication_id_fkey` FOREIGN KEY (`publication_id`) REFERENCES `publications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
