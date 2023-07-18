/*
  Warnings:

  - Added the required column `uf` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StateUF" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "uf" "StateUF" NOT NULL;
