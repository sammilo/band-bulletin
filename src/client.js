import { createClient } from "@supabase/supabase-js";

const URL = 'https://zjruomootusqmvoxuzsj.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqcnVvbW9vdHVzcW12b3h1enNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDM2NjIsImV4cCI6MjA3ODk3OTY2Mn0.XbJDaL7emCAwW4fBig9kSF88Bl3zdFhP-Bfm32z7i3Y'

export const supabase = createClient(URL, API_KEY);