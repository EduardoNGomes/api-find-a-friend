/*
  Warnings:

  - The values [Acre,Alagoas,Amapa,Amazonas,Bahia,Ceara,Espirito_Santo,Goias,Maranhao,Mato_Grosso,Mato_Grosso_do_Sul,Minas_Gerais,Para,Paraiba,Parana,Pernambuco,Piaui,Rio_de_Janeiro,Rio_Grande_do_Norte,Rio_Grande_do_Sul,Rondonia,Roraima,Santa_Catarina,Sao_Paulo,Sergipe,Tocantins] on the enum `StatesOptions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatesOptions_new" AS ENUM ('acre', 'alagoas', 'amapa', 'amazonas', 'bahia', 'ceara', 'espirito_santo', 'goias', 'maranhao', 'mato_grosso', 'mato_grosso_do_sul', 'minas_gerais', 'para', 'paraiba', 'parana', 'pernambuco', 'piaui', 'rio_de_janeiro', 'rio_grande_do_norte', 'rio_grande_do_sul', 'rondonia', 'roraima', 'santa_catarina', 'sao_paulo', 'sergipe', 'tocantins');
ALTER TABLE "states" ALTER COLUMN "name" TYPE "StatesOptions_new" USING ("name"::text::"StatesOptions_new");
ALTER TYPE "StatesOptions" RENAME TO "StatesOptions_old";
ALTER TYPE "StatesOptions_new" RENAME TO "StatesOptions";
DROP TYPE "StatesOptions_old";
COMMIT;
