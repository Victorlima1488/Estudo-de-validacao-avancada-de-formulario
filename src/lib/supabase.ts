import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://vujpvjmublnnynlatgxx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1anB2am11YmxubnlubGF0Z3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5NTQyMzAsImV4cCI6MjAwNTUzMDIzMH0.vfGpGiESBzzfVAn1PtzSTQGGldnY8j_NovBPZY1jgmI'
)