/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
- `id` (uuid, primary key, auto-generated)
- `name` (text, not null) — the name of the person submitting the form
- `email` (text, not null) — the email of the person submitting the form
- `message` (text, not null) — the message content
- `created_at` (timestamptz, default now()) — when the message was submitted
2. Security
- Enable RLS on `contact_messages`.
- Allow anon + authenticated to INSERT (so visitors can submit the contact form without signing in).
- No SELECT, UPDATE, or DELETE for anon/authenticated — only the database owner can read messages through the Supabase dashboard.
3. Notes
- This is a portfolio contact form with no sign-in screen, so anon insert access is required.
- Messages are private and can only be read through the Supabase admin dashboard, not from the frontend.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);
