"use server";
import { createSupabaseClient } from "@/lib/Supabase";
import { auth, currentUser } from "@clerk/nextjs/server";


export const createNote = async (inputData: {
    title: string;
    content: string;
    folder_id: string;
    user_id: string;
}) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase
        .from("notes")
        .insert([inputData])  // يجب أن تكون داخل مصفوفة

    if (error || !data) {
        throw new Error(error?.message || "Failed to insert note");
    }

    return data[0]; // عادة Supabase يعيد مصفوفة فيها السجل الجديد
};

export const getnotes = async ({ folderid, userid }: folder) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from('notes').select().eq('folder_id', folderid).eq('user_id', userid).order('created_at', { ascending: false })
    if (!data || error) {
        throw new Error(error?.message || 'Failed to get data')
    }
    return data
}

export const getNoteById = async ({ noteId }: GetNoteId) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from("notes").select("*").eq("id", noteId)
    if (!data || error) {
        console.log(error)
    }
    //@ts-ignore
    return data[0]
}

export const updateNoteById = async ({ noteId, content, title }: updateData) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from("notes").update({ title, content }).eq("id", noteId).select("*")
    if (!data || error) {
        console.log(error)
    }
    // @ts-ignore
    return data[0]
}


export const deleteNote = async ({ noteId }: note) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from("notes").delete().eq("id", noteId)
    if (!data || error) {
        console.log(error)
    }
    return data
}


// folders funstion 
export const createFolder = async ({ fldr }: fldr) => {

    const supabase = await createSupabaseClient()
    const user = await currentUser()
    if (!user) {
        throw new Error("User not authenticated");
    }
    const { data, error } = await supabase.from("folders").insert({ name: fldr, user_id: user.id }).select("*")
    if (!data || error) {
        console.log(error)
    }
    console.log(data)
    // @ts-ignore
    return data
}

export const getFolders = async ({ userid }: { userid: string }) => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from("folders").select("*").eq("user_id", userid)
    console.log(data)
    if (!data?.length || error) {
        console.log(error)
        return null
    }
    return data
}

// Notes Options 
export const updateFavorite = async ({ noteId, is_favorite }: { noteId: string; is_favorite: boolean }) => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('notes').update({ is_favorite }).eq("id", noteId).select("*")
    if (!data || error) throw new Error(error.message)
    return data[0]
}
export const updateArchived = async ({ noteId, is_archived }: { noteId: string; is_archived: boolean }) => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('notes').update({ is_archived }).eq("id", noteId).select("*")
    if (!data || error) throw new Error(error.message)
    return data[0]
}
export const updateTrach = async ({ noteId, is_trashed }: { noteId: string; is_trashed: boolean }) => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('notes').update({ is_trashed }).eq("id", noteId).select("*")
    if (!data || error) throw new Error(error.message)
    return data[0]
}
export const listFavorites = async () => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('notes').select("*").eq('is_favorite', true)
    if (!data || error) throw new Error(error.message)
    return data
}
export const listArchives = async () => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('notes').select("*").eq('is_archived', true)
    if (!data || error) throw new Error(error.message)
    return data[0]
}
export const listTrach = async () => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('notes').select("*").eq('is_trashed', true)
    if (!data || error) throw new Error(error.message)
    return data
}