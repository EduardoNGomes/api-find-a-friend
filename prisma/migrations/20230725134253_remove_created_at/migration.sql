/*
  Warnings:

  - You are about to drop the column `created_at` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `requirements` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `states` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cities" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "states" DROP COLUMN "created_at";
