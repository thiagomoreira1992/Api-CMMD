/*
  Warnings:

  - Added the required column `userId` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Movement_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
INSERT INTO "new_Movement" ("createdAt", "id", "quantity", "recordId") SELECT "createdAt", "id", "quantity", "recordId" FROM "Movement";
DROP TABLE "Movement";
ALTER TABLE "new_Movement" RENAME TO "Movement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
