-- CreateTable
CREATE TABLE "SystemUserType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" TEXT NOT NULL DEFAULT '[]',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemUserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "author" TEXT NOT NULL,
    "authorImage" TEXT,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "readTime" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "showInHome" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "heroVideo" TEXT,
    "heroImageAlt" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "carouselData" TEXT,
    "showInHome" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemUserType_name_key" ON "SystemUserType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SystemUser_email_key" ON "SystemUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- AddForeignKey
ALTER TABLE "SystemUser" ADD CONSTRAINT "SystemUser_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "SystemUserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
