-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "batch" TEXT NOT NULL,
    "materialId" INTEGER NOT NULL,
    "expires" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Record_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
INSERT INTO "new_Record" ("batch", "createdAt", "expires", "id", "materialId", "quantity", "updatedAt", "userId") SELECT "batch", "createdAt", "expires", "id", "materialId", "quantity", "updatedAt", "userId" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
CREATE UNIQUE INDEX "Record_batch_key" ON "Record"("batch");
CREATE TABLE "new_Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Material_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "Material_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Material" ("categoryId", "createdAt", "id", "name", "presentation", "updatedAt", "userId") SELECT "categoryId", "createdAt", "id", "name", "presentation", "updatedAt", "userId" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
