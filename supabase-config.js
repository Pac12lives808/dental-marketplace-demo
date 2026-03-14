import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://fxfwytxfeuwsbeapiyqw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Znd5dHhmZXV3c2JlYXBpeXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDI0ODUsImV4cCI6MjA4OTA3ODQ4NX0.anZxOWzcVyobPx8hW_DUpdIl1IAWeE-AWXpZq-ysXvI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);