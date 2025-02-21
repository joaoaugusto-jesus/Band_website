/*
  Warnings:

  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add the `name` column with a default value
ALTER TABLE "OrderItem"
ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Unknown';

-- Add the `type` column with a default value
ALTER TABLE "OrderItem"
ADD COLUMN "type" TEXT NOT NULL DEFAULT 'product';