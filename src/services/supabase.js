import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wjmkxoilosvzlimslnta.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbWt4b2lsb3N2emxpbXNsbnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDg3OTIsImV4cCI6MjAzMDM4NDc5Mn0._hTPEvQT4HQWgSSVp-bEzoNvkSo-ou8r-X9qO5pgjI4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
