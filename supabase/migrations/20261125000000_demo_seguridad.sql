ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leer opiniones"
  ON public.feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);
