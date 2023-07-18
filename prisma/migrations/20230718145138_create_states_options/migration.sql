/*
  Warnings:

  - Changed the type of `name` on the `states` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatesOptions" AS ENUM ('Acre', 'Alagoas', 'Amapa', 'Amazonas', 'Bahia', 'Ceara', 'Espirito_Santo', 'Goias', 'Maranhao', 'Mato_Grosso', 'Mato_Grosso_do_Sul', 'Minas_Gerais', 'Para', 'Paraiba', 'Parana', 'Pernambuco', 'Piaui', 'Rio_de_Janeiro', 'Rio_Grande_do_Norte', 'Rio_Grande_do_Sul', 'Rondonia', 'Roraima', 'Santa_Catarina', 'Sao_Paulo', 'Sergipe', 'Tocantins');

-- AlterTable
ALTER TABLE "states" DROP COLUMN "name",
ADD COLUMN     "name" "StatesOptions" NOT NULL;
