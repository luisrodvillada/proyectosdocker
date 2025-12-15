-- Init DB: crea la tabla items y añade un ejemplo
CREATE TABLE IF NOT EXISTS items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

INSERT INTO items (name) VALUES ('example item') ON CONFLICT DO NOTHING;
