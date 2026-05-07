-- Add current_order_number to test_types (default 1 backfills existing rows)
ALTER TABLE "test_types"
  ADD COLUMN IF NOT EXISTS "current_order_number" integer DEFAULT 1 NOT NULL;

-- Add order_number to patient_tests (default 1 backfills existing rows)
ALTER TABLE "patient_tests"
  ADD COLUMN IF NOT EXISTS "order_number" integer DEFAULT 1 NOT NULL;
