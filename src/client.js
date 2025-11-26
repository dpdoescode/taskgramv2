import { createClient } from '@supabase/supabase-js'

const url = 'https://phvtgryfohscsspobkcd.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodnRncnlmb2hzY3NzcG9ia2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODgwODcsImV4cCI6MjA3OTE2NDA4N30.q5__GPVR43oJ0sYbHGL_QSJApTjeDEWjCnCyFsNKR9o'


export const supabase = createClient(URL, API_KEY)

