import { createSupabaseClient } from "@/lib/Supabase";
interface GetNoteId {
    noteId: string
}
interface updateData {
    Subject: string
    Text: string
    noteId: string
}
interface note {
    noteId: string
}
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

export const getNoteById = async ({ noteId }: GetNoteId) => {
    const { data, error } = await supabase.from("Notes").select("*").eq("id", noteId)
    if (!data || error) {
        console.log(error)
    }
    //@ts-ignore
    return data[0]
}
export const updateNoteById = async ({ noteId, Subject, Text }: updateData) => {
    const { data, error } = await supabase.from("Notes").update({ Subject, Text }).eq("id", noteId).select("*")
    if (!data || error) {
        console.log(error)
    }
    // @ts-ignore
    return data[0]
}





export const deleteNote = async ({ noteId }: note) => {
    const { data, error } = await supabase.from("Notes").delete().eq("id", noteId)
    if (!data || error) {
        console.log(error)
    }
    return data
}