"use server";
import { createSupabaseClient } from "@/lib/Supabase";
import { auth, currentUser } from "@clerk/nextjs/server";


export const createNote = async (inputData: {
    Subject: string;
    Text: string;
    folderid: string
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

export const getnotes = async ({ folderid }: folder) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from('notes').select().eq("folderid", folderid).order('created_at', { ascending: false })
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

export const updateNoteById = async ({ noteId, Subject, Text }: updateData) => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from("notes").update({ Subject, Text }).eq("id", noteId).select("*")
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

export const getFolders = async () => {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from("folders").select("*")
    if (!data?.length || error) {
        console.log(error)
        return null
    }
    // @ts-ignore
    return data
}
