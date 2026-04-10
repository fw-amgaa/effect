-- Add test_types table
CREATE TABLE IF NOT EXISTS "test_types" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Add test_files table
CREATE TABLE IF NOT EXISTS "test_files" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "test_id" uuid NOT NULL,
  "file_url" text NOT NULL,
  "file_name" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Add foreign key
ALTER TABLE "test_files" ADD CONSTRAINT "test_files_test_id_patient_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."patient_tests"("id") ON DELETE cascade ON UPDATE no action;
