import { createSupabaseClient } from "@/lib/Supabase";
const supabase = await createSupabaseClient()

export const createNote = async (inputData: {
    Subject: string;
    Text: string;
    // folder_id?: string;
    // أضف أي أعمدة أخرى حسب الجدول عندك
}) => {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
        .from("Notes")
        .insert([inputData])  // يجب أن تكون داخل مصفوفة

    if (error || !data) {
        throw new Error(error?.message || "Failed to insert note");
    }

    return data[0]; // عادة Supabase يعيد مصفوفة فيها السجل الجديد
};




export const getNotes = async () => {
    const { data, error } = await supabase.from('Notes').select().order('created_at', { ascending: false })
    if (!data || error) {
        throw new Error(error?.message || 'Failed to get data')
    }
    return data
}
