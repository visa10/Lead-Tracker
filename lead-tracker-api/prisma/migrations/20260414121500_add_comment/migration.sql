-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "lead_id" TEXT NOT NULL,
    "text" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Comment_text_length_check" CHECK (char_length("text") BETWEEN 1 AND 500)
);

-- CreateIndex
CREATE INDEX "Comment_lead_id_idx" ON "Comment"("lead_id");

-- AddForeignKey
ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_lead_id_fkey"
FOREIGN KEY ("lead_id") REFERENCES "Lead"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

