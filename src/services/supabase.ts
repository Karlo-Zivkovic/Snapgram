import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfluxqymxlkbchyzzhge.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbHV4cXlteGxrYmNoeXp6aGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMjEyNDcsImV4cCI6MjAxNDU5NzI0N30.0C-LIA65C_4SHTdTqW-zNiPyQxCFQf5qaTXA16-DD1M";
export const supabase = createClient(supabaseUrl, supabaseKey);
