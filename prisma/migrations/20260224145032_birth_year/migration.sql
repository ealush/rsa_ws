-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JumpRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "travelerName" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "birthYear" INTEGER NOT NULL DEFAULT 1990,
    "destinationYear" INTEGER NOT NULL,
    "plutoniumCores" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_JumpRequest" ("createdAt", "destinationYear", "id", "mission", "plutoniumCores", "travelerName") SELECT "createdAt", "destinationYear", "id", "mission", "plutoniumCores", "travelerName" FROM "JumpRequest";
DROP TABLE "JumpRequest";
ALTER TABLE "new_JumpRequest" RENAME TO "JumpRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
