import { createClient } from '@supabase/supabase-js'
export const createSupabaseClient = async () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    )
}
