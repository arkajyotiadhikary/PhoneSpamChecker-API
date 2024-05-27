-- DropIndex
DROP INDEX "Contact_phoneNumber_key";

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "name" DROP NOT NULL;
