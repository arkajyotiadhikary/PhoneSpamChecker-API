-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userID_fkey";

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
