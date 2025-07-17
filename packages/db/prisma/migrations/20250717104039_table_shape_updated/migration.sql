/*
  Warnings:

  - You are about to drop the column `roomId` on the `Shape` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Shape` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shape" DROP CONSTRAINT "Shape_roomId_fkey";

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "roomId",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Room"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
