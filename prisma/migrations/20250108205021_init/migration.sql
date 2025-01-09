-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishDate" TEXT,
    "likes" INTEGER,
    "pages" INTEGER,
    "author" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
