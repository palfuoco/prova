import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uptnwurmwcrzpptcxtbz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdG53dXJtd2NyenBwdGN4dGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDUyODksImV4cCI6MjA1OTY4MTI4OX0.3ecxnmEYLEMSRN2bBasUYQUSCUUkpXd3g4U8DdCdoPE';

export const supabase = createClient(supabaseUrl, supabaseKey);
