CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST');

CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "company" VARCHAR(255),
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "value" DOUBLE PRECISION,
    "notes" VARCHAR(2000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Lead_name_length" CHECK (char_length("name") BETWEEN 1 AND 255),
    CONSTRAINT "Lead_value_positive" CHECK ("value" IS NULL OR "value" >= 0)
);

